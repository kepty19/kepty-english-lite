/**
 * Kepty: access key 解決（basic info. の C 列と同一の /p/{token} 形式を正とする）
 * - URL パス: /p/{token}/...  （Vercel rewrite で各 .html が配信される想定）
 * - フォールバック: ?id=  → localStorage → sessionStorage → 既定値
 * - LINE 公式アプリの LIFF 内ブラウザでは localStorage が使えない・分離されることがあり、
 *   sessionStorage フォールバックで同一セッション内の userId を維持する。
 * 全ページで study-tracker.js より前に読み込むこと。
 */
(function (global) {
    var STORAGE_KEY = 'keptyUserId';
    /** 開発・フォールバック用（スプレッドシートの access key 形式に合わせる） */
    var DEFAULT_ACCESS_KEY = '/p/lite';

    /**
     * pathname が /p/training のように「ページ名」を誤ってトークン扱いしない（study 時間が別 GAS 行に飛ぶ原因になる）
     */
    var KEPTY_P_SEGMENT_NOT_USER_TOKEN_ = {
        training: 1,
        main: 1,
        dashboard: 1,
        index: 1,
        liff: 1,
        'learning-management': 1,
        'learning-direction': 1,
        'locker-room': 1,
        'dressing-room': 1,
        'admin-audio': 1,
        'audio-management': 1
    };

    function isAppPageSegmentNotUserToken_(rawSegment, cleansedTok) {
        var s = trimStr(rawSegment || '').toLowerCase().replace(/\.html$/i, '');
        if (KEPTY_P_SEGMENT_NOT_USER_TOKEN_[s]) {
            return true;
        }
        var c = trimStr(cleansedTok || '').toLowerCase();
        return !!c && !!KEPTY_P_SEGMENT_NOT_USER_TOKEN_[c];
    }

    function trimStr(s) {
        return String(s || '').trim();
    }

    /**
     * LINE 内蔵ブラウザ等でパス／クエリに混入する不可視文字・改行（%0A）・末尾ゴミを除去し、
     * アクセストークンとして許容する英数字と ._- の連続のみを抽出する。
     */
    function cleanseTokenString_(raw) {
        if (raw == null || raw === '') {
            return '';
        }
        var s = String(raw);
        try {
            s = decodeURIComponent(s.replace(/\+/g, ' '));
        } catch (eDec) {
            s = String(raw);
        }
        s = s.replace(/[\u200b-\u200d\ufeff]/g, '');
        s = s.replace(/\u00a0/g, ' ');
        s = s.replace(/%0[aAdD]/gi, '');
        s = s.replace(/[\r\n\t\v\f]+/g, '');
        s = s.trim();
        var m = s.match(/[a-zA-Z0-9._-]+/);
        return m ? m[0] : '';
    }

    function safeGet(key) {
        try {
            var v = global.localStorage.getItem(key);
            if (v) return v;
        } catch (e0) {}
        try {
            var v2 = global.sessionStorage.getItem(key);
            if (v2) return v2;
        } catch (e1) {}
        return '';
    }

    function safeSet(key, val) {
        var s = String(val || '');
        try {
            global.localStorage.setItem(key, s);
        } catch (e2) {}
        try {
            global.sessionStorage.setItem(key, s);
        } catch (e3) {}
    }

    /**
     * 比較・ファイル名用: /p/ を除いたトークン部分
     */
    function tokenOnly(accessKey) {
        var x = trimStr(accessKey);
        var low = x.toLowerCase();
        var p = low.indexOf('/p/');
        if (p >= 0) x = x.slice(p + 3);
        x = x.replace(/^\/+/, '').trim();
        return cleanseTokenString_(x);
    }

    /**
     * シート・GAS と揃える正規形: 常に /p/{token}（URL の表記を保持。突き合わせは GAS 側で大小無視）
     */
    function normalizeAccessKey(raw) {
        var s = trimStr(raw);
        if (!s) return DEFAULT_ACCESS_KEY;
        if (s.indexOf('/p/') === 0) {
            var rest = tokenOnly(s);
            return rest ? '/p/' + rest : DEFAULT_ACCESS_KEY;
        }
        if (/^[a-zA-Z0-9._-]+$/.test(s)) {
            return '/p/' + s;
        }
        return s.indexOf('/') === 0 ? s : '/p/' + tokenOnly(s);
    }

    /**
     * 現在の pathname から /p/{token} を取得（なければ ''）
     * GitHub Pages 等で /repo/p/{token}/page のように先頭が /p/ でない場合も拾う。
     */
    function pathPrefix() {
        var pathname = global.location && global.location.pathname ? global.location.pathname : '';
        var m = pathname.match(/\/p\/([^/]+)/);
        if (!m) {
            return '';
        }
        var tok = cleanseTokenString_(m[1]);
        if (!tok || isAppPageSegmentNotUserToken_(m[1], tok)) {
            return '';
        }
        return '/p/' + tok;
    }

    /**
     * LINE 内蔵ブラウザで pathname が未確定のとき、href 全体から /p/{token} を拾う。
     */
    function pathPrefixFromFullHref_() {
        try {
            var href = global.location && global.location.href ? String(global.location.href) : '';
            if (!href) {
                return '';
            }
            var base = href.split('#')[0];
            var m = base.match(/\/p\/([^/?#]+)/);
            if (!m) {
                return '';
            }
            var tok = cleanseTokenString_(m[1]);
            if (!tok || isAppPageSegmentNotUserToken_(m[1], tok)) {
                return '';
            }
            return '/p/' + tok;
        } catch (eH) {
            return '';
        }
    }

    /** 本番コンソールを赤く染めない（Chrome は console.error を「エラー」扱いする） */
    function logIdDebug_(canonPath) {
        try {
            if (typeof console !== 'undefined' && typeof console.debug === 'function') {
                console.debug("[ID-FINAL-CHECK] '" + canonPath + "'");
                console.debug("[ID-TOKEN-ONLY] '" + tokenOnly(canonPath) + "'");
            }
        } catch (eL) {}
    }

    /**
     * LINE アプリ内 WebView でクエリが落ちる場合のフォールバック（liff.html が #keptyUserId= を付与）
     */
    function hashAccessKey() {
        try {
            var h = global.location && global.location.hash ? global.location.hash : '';
            if (!h || h.length < 2) {
                return '';
            }
            h = h.replace(/^#/, '');
            var m1 = h.match(/(?:^|[&?])keptyUserId=([^&]+)/);
            if (m1) {
                var t1 = cleanseTokenString_(m1[1]);
                return t1 ? '/p/' + t1 : '';
            }
            var m2 = h.match(/(?:^|[&?])id=([^&]+)/);
            if (m2) {
                var t2 = cleanseTokenString_(m2[1]);
                return t2 ? '/p/' + t2 : '';
            }
            var m3 = h.match(/\/p\/([^/?&#]+)/);
            if (m3) {
                var t3 = cleanseTokenString_(m3[1]);
                if (t3 && !isAppPageSegmentNotUserToken_(m3[1], t3)) {
                    return '/p/' + t3;
                }
            }
        } catch (eH) {}
        return '';
    }

    function resolveKeptyUserId() {
        var canonPath;
        var fromPath = pathPrefix();
        if (!fromPath) {
            fromPath = pathPrefixFromFullHref_();
        }
        if (fromPath) {
            canonPath = normalizeAccessKey(fromPath);
            safeSet(STORAGE_KEY, canonPath);
            logIdDebug_(canonPath);
            return canonPath;
        }

        var params = new global.URLSearchParams(global.location.search || '');
        var idQuery = trimStr(params.get('id'));
        if (idQuery) {
            var idClean = cleanseTokenString_(idQuery);
            canonPath = normalizeAccessKey(idClean || idQuery);
            safeSet(STORAGE_KEY, canonPath);
            logIdDebug_(canonPath);
            return canonPath;
        }

        var fromHash = trimStr(hashAccessKey());
        if (fromHash) {
            var canonH = normalizeAccessKey(fromHash);
            safeSet(STORAGE_KEY, canonH);
            logIdDebug_(canonH);
            return canonH;
        }

        var stored = trimStr(safeGet(STORAGE_KEY));
        if (stored) {
            canonPath = normalizeAccessKey(stored);
            logIdDebug_(canonPath);
            return canonPath;
        }

        safeSet(STORAGE_KEY, DEFAULT_ACCESS_KEY);
        logIdDebug_(DEFAULT_ACCESS_KEY);
        return DEFAULT_ACCESS_KEY;
    }

    global.KeptyUserId = {
        resolve: resolveKeptyUserId,
        normalize: normalizeAccessKey,
        pathPrefix: pathPrefix,
        pathPrefixFromFullHref: pathPrefixFromFullHref_,
        tokenOnly: tokenOnly,
        cleanseTokenString: cleanseTokenString_,
        STORAGE_KEY: STORAGE_KEY,
        DEFAULT: DEFAULT_ACCESS_KEY
    };
})(typeof window !== 'undefined' ? window : this);
