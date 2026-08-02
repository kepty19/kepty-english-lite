/**
 * トレーニング画面の日本語ガイド本文（UTF-8 専用）
 * training.html 本体の日本語が環境により ? に化けるのを防ぐため分離
 */
(function (global) {
    'use strict';

    var TRAINING_GUIDES = {
        vocabulary:
            '<h3 class="tg-title">Vocabulary</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【知識データベース】の強化。全スキルの土台作り。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">英語の理解スピードと表現の幅が劇的に向上します。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">英単語を見て、1〜2秒以内に「イメージ」を浮かべる</p><p class="tg-step-desc">概念が浮かんだ場合は音読を省略し、即座に次の単語へ進む。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">思い出せない場合は「例文音読」と「音声再生」を即座に行う</p><p class="tg-step-desc">3秒考えて浮かばない場合は粘らず正解を確認し、英語の例文を3回音読する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">区切りまで到達したら「最初のレッスン」から再開する</p><p class="tg-step-desc">2〜3サイクルは全単語に「浅く広く」触れ、接触回数を稼ぐことに徹する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">4サイクル目以降は「保存リスト」で苦手のみを撃破する</p><p class="tg-step-desc">3サイクルで覚えられなかった単語のみを「保存リスト」へ追加し、全単語の定着を完了させる。</p></div></div>' +
            '</div>',

        pronunciation:
            '<h3 class="tg-title">Pronunciation</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【知識データベース・音声化】の強化。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">リスニング力が向上し、相手に一度で伝わる発音が身につきます。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「解説」タブを読み、音のメカニズムを論理的に理解する</p><p class="tg-step-desc">口・舌・喉の使い方を他人に説明できるレベルまで頭に叩き込む。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">「参考動画」タブを視聴し、物理的な動きを視覚的に補完する</p><p class="tg-step-desc">実際の口の動きを確認し、自分がその音を出せるようになるイメージを仕上げる。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">「確認テスト」タブへ進み、音声を聴いてから「3回」発話する</p><p class="tg-step-desc">1単語ずつ「音声再生 → 忠実な再現」を3回繰り返す。口・舌の動きを一致させることに集中する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">全単語のセットを「5サイクル」繰り返し、定着させる</p><p class="tg-step-desc">6単語すべてを5周（1単語 計15回）発話し、意識せずとも正しい音が出せる状態まで定着させる。</p></div></div>' +
            '</div>',

        grammar:
            '<h3 class="tg-title">Grammar</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【知識データベース】の構築。全レベルの学習者に必須の基礎力。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">複雑な内容も正確に伝えられ、中上級者の伸び悩みを防ぎます。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「解説」タブを読み、文法ルールを論理的に理解する</p><p class="tg-step-desc">他人に内容を説明できる状態を合格基準とし、ルールを完全に咀嚼する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">「確認テスト」タブへ進み、全20問の問題演習を実施する</p><p class="tg-step-desc">インプットした知識が正しく定着しているかを実戦形式で確認する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">解答を確認し、自身の理解度を客観的に把握する</p><p class="tg-step-desc">間違えた問題や確信が持てなかった箇所は再度「解説」に戻り、知識を完璧な状態へ引き上げる。</p></div></div>' +
            '</div>',

        shadowing:
            '<h3 class="tg-title">Shadowing</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【音声知覚】の自動化。音を拾う脳の負荷を下げます。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">リンキング・リダクションなどの音の変化に強くなり、リスニングが楽になります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ 意味理解</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">スクリプトを見ずに音声のみを聴き、現状の理解度を確認する</p><p class="tg-step-desc">音だけでどこまで理解できるか把握する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">英文スクリプトを確認し、文字と音を一致させる</p><p class="tg-step-desc">聞き取れなかった箇所を特定する。理解できていれば手順3をスキップ可。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">日本語訳を確認し、文脈と意味を完全に把握する</p><p class="tg-step-desc">英文だけでは不透明なニュアンスを理解し、意味の壁を取り払う。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ 音のインストール</span></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">「Sound Change」タブで音の変化の正体を論理的に特定する</p><p class="tg-step-desc">Linking・Reductionなどのポイントを視覚的に確認し、発音の「仕組み」を脳に叩き込む。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">5</div><div class="tg-step-body"><p class="tg-step-title">「Sound Change」を見ながら「オーバーラッピング」を5〜10回行う</p><p class="tg-step-desc">音の変化を意識しながらモデル音声と同時に発音し、口を英語のリズムに適応させる。</p></div></div>' +
            '<div class="tg-overlap-cta-wrap"><button type="button" class="tg-inline-help-link" onclick="openTgOverlapDetail()" aria-label="オーバーラッピングの詳しい説明を開く"><span class="tg-inline-help-link-text">なぜオーバーラッピングが重要か？</span><span class="tg-inline-help-tap-stack" aria-hidden="true"><span class="tg-inline-help-tap-label">クリック</span><i data-lucide="mouse-pointer-click" class="tg-inline-help-tap-ic"></i></span></button></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 3 ─ 音声知覚の自動化</span></div>' +
            '<div class="tg-step"><div class="tg-num">6</div><div class="tg-step-body"><p class="tg-step-title">スクリプトを見ず、0.5秒遅れて発音する「シャドーイング」を行う</p><p class="tg-step-desc">詰まった場合はPhase 2に戻る。意識せずとも音が再現できる「自動化」の状態まで追い込む。</p></div></div>' +
            '<div class="tg-overlap-cta-wrap"><button type="button" class="tg-inline-help-link" onclick="openTgShadowWhyDetail()" aria-label="シャドーイングまで実施する理由を開く"><span class="tg-inline-help-link-text">なぜシャドーイングまで実施する必要があるか？</span><span class="tg-inline-help-tap-stack" aria-hidden="true"><span class="tg-inline-help-tap-label">クリック</span><i data-lucide="mouse-pointer-click" class="tg-inline-help-tap-ic"></i></span></button></div>' +
            '<div class="tg-tip"><span class="tg-tip-label">💡 4日間 学習サイクル</span><div class="tg-tip-cols">' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">1日目</span><span class="tg-tip-copy">手順(1)〜(5)中心。音の「設計図」を脳内に作る。</span></div>' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">2日目</span><span class="tg-tip-copy">シャドーイングを学習時間いっぱい繰り返す。</span></div>' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">3日目</span><span class="tg-tip-copy">2日目同様に繰り返し実施。最後の1回をLINEで提出。フィードバックを受け取る。（音声提出1回目）</span></div>' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">4日目</span><span class="tg-tip-copy">フィードバック内容を意識し、3日目同様に繰り返し実施。最後の1日をやり切り、その最後の1回をLINEで提出。（音声提出2回目）</span></div>' +
            '</div></div></div>',

        reading:
            '<h3 class="tg-title">Reading</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【意味理解】のスピード向上。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">「返り読み」を卒業し、英語の語順のまま理解する力がつきます。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「Pickup Phrases」を確認し、重要語彙を事前にインストールする</p><p class="tg-step-desc">未知の語彙による「思考の停止」を防ぎ、スムーズな読解への土台を作る。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">本文を英語の語順通り、前から順番に読み進める</p><p class="tg-step-desc">日本語の語順に置き換えず、英語が流れてくる順番で意味を捉える。返り読みを徹底的に排除する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">難解な箇所は「スラッシュリーディング」タブでチャンクごとに理解する</p><p class="tg-step-desc">情報の塊（チャンク）で処理する感覚を本文にフィードバックし、理解スピードを底上げする。</p></div></div>' +
            '</div>',

        topicTalk:
            '<h3 class="tg-title">Topic Talk</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【概念化】スキルの強化。思考の整理術。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">結論から理由、具体例へと繋げる論理的な構成力・展開力が身につきます。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ アプリで反復トレーニング</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">トピックを選択し、30〜60秒で「話の構成」を練る</p><p class="tg-step-desc">PREP法（結論→理由→具体例→結論）を意識し、自分のスタンスを明確に決める。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">選んだトピックについて30〜60秒間のスピーチを行う</p><p class="tg-step-desc">構成に沿って実際に声に出して話す。流暢さより論理の繋がりを優先する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">スピーチ直後に振り返りを行い、論理の「ズレ」を修正する</p><p class="tg-step-desc">自分のポジションは明確か／理由に論理性はあるか／具体例の解像度は十分かを確認する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">納得いくまで(2)〜(3)を繰り返し、クリアしたら次のトピックへ</p><p class="tg-step-desc">「スムーズかつ論理的に表現できた」と感じるまで精度を高める。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ 公式LINE 確認テスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">5</div><div class="tg-step-body"><p class="tg-step-title">未学習のトピックを選び、LINEのマイクで音声を提出する</p><p class="tg-step-desc">トレーニングしたものではなく、「新しいトピック」に初見で挑む。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">6</div><div class="tg-step-body"><p class="tg-step-title">AIの自動フィードバックを確認し、スピーチを客観視する</p><p class="tg-step-desc">自分の感覚とAIの客観的評価を照らし合わせ、その日の改善点を明確にする。</p></div></div>' +
            '</div>',

        speaking:
            '<h3 class="tg-title">Speaking Form</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【文章化】への橋渡し。英語的な思考回路の定着。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">ネイティブにとって自然で「英語らしい」表現ができるようになります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ インプットと型の刷り込み</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「解説」を読み込み、テーマとポイントを論理的に咀嚼する</p><p class="tg-step-desc">なぜその英語表現が「英語らしい」のかというロジックを腹に落とす。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">5つの例文を、1文につき「5回連続」で音読する</p><p class="tg-step-desc">テーマとポイントを意識しながら1文を5回ずつ丁寧に読み、英語特有のフォームを定着させる。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ 制約付きアウトプット</span></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">「確認テスト」のトピックと「ルール」を確認する</p><p class="tg-step-desc">提示された制約（禁止事項・挑戦課題）が、学んだ「英語らしい思考」を強制するための装置。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">ルールを遵守し、30〜60秒間のスピーチを構築・実施する</p><p class="tg-step-desc">日本語的な発想を捨て、ルールに沿って「英語の視点」で文章を編み出す訓練に徹する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">5</div><div class="tg-step-body"><p class="tg-step-title">納得できるまで反復し、自分自身で合格を出す</p><p class="tg-step-desc">LINEへの音声提出は不要。フォームが完全に定着した状態で次の課題へ進む。</p></div></div>' +
            '</div>',

        chunk:
            '<h3 class="tg-title">Sentence Building</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">【文章化】スキルの高速化。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">期待できる効果</span><p class="tg-meta-desc">脳内の知識を瞬時にアウトプットする回路が太くなり、レスポンスが早くなります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ 高回転アウトプット（1〜3サイクル）#文章リスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">日本語を見て「5秒以内」にフルセンテンスを発話する</p><p class="tg-step-desc">最大5秒で言えた場合は次へ。詰まった場合は即座に英文を確認し、音声に合わせて3回音読する。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">1テーマに留まらず、レッスン全体を「浅く、速く」回す</p><p class="tg-step-desc">全テーマの文章に何度も出会うことを優先し、このレッスン単位の周回を3サイクル繰り返す。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ 弱点排除と自動化（4サイクル目以降）#保存リスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">5秒以上かかった文章を「保存リスト」へ追加し、徹底撃破する</p><p class="tg-step-desc">「言えるもの」を繰り返す無駄を省き、脳が拒絶している構文・語順だけを反復する。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 3 ─ 確認テスト #確認テスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">ランダム抽出された30問に対し、スムーズに回答する</p><p class="tg-step-desc">「保存リスト」がゼロになった段階で実施。思考回路のスピードと正確さに全神経を集中させる。</p></div></div>' +
            '</div>'
    };

    var TG_OVERLAP_DETAIL_HTML =
        '<div class="word-card grammar-explain-root tg-od-doc py-6 md:py-8 px-0 text-slate-700 text-left max-w-full min-w-0">' +
        '<header class="tg-od-head tg-od-head--spaced">' +
        '<h3 class="tg-od-h1">シャドーイングの前に「オーバーラッピング」が必要な理由</h3>' +
        '<h4 class="tg-od-section-title--plain tg-od-kicker-plain">（1）なぜ、いきなりシャドーイングは良くない？</h4>' +
        '</header>' +
        '<div class="tg-od-conclusion-wrap">' +
        '<p class="tg-od-conclusion-label">結論</p>' +
        '<p class="tg-od-conclusion-text">英語の音の変化を「知覚」し、「再現」の順で脳にインストールする必要がある。</p></div>' +
        '<p class="tg-od-text">オーバーラッピングはモデル音声と同タイミングで発話し、音のつながりとリズムを身体に覚えさせる工程です。いきなり遅延シャドーイングに入ると、まだ耳が追えない音を無理に真似することになり、フォームが崩れやすくなります。</p>' +
        '<p class="tg-od-text tg-od-text--tight">先に Sound Change で仕組みを理解し、オーバーラッピングで「同時発話」に慣れてから、0.5秒遅れのシャドーイングへ進むのが効率的です。</p>' +
        '<ul class="tg-od-bullets"><li>同時発話で口の運びと拍の感覚を一致させる</li>' +
        '<li><strong>聞き取れない音</strong>をその場で補正できる</li>' +
        '<li>シャドーイングは「追跡」に特化した次の段階として効く</li></ul>' +
        '<p class="tg-od-text">この順序を飛ばすと、シャドーイングが単なる暗唱になり、音の変化に対する感度が育ちにくくなります。</p>' +
        '<section class="tg-od-section tg-od-section--merit">' +
        '<h4 class="tg-od-section-title--plain">（2）オーバーラッピングの効果</h4>' +
        '<p class="tg-od-text">モデル音声と<strong>同じタイミング</strong>で発話することで、英語の拍・つながり・弱形が身体レベルで再現できるようになります。</p>' +
        '<p class="tg-od-text">まずは短いフレーズから3セット、慣れたら同じレッスンを通しで回すのがおすすめです。</p>' +
        '<div class="tg-od-numlist-stack">' +
        '<div class="tg-od-numlist-item">' +
        '<p class="tg-od-numlist-title">1. 聞こえた音をそのまま出す</p>' +
        '<p class="tg-od-numlist-body">イメージより「音の形」を優先し、母語の音に引っ張られないよう意識する。</p></div>' +
        '<div class="tg-od-numlist-item">' +
        '<p class="tg-od-numlist-title">2. つまずいたら同じ箇所を反復</p>' +
        '<p class="tg-od-numlist-body">0.5秒遅れのシャドーに進む前に、同時発話で安定させる。</p></div>' +
        '<div class="tg-od-numlist-item">' +
        '<p class="tg-od-numlist-title">3. 一定速度まで上げてから次へ</p>' +
        '<p class="tg-od-numlist-body">無理にテンポだけ上げず、<strong>正しい運び</strong>を保てる範囲で速度を上げる。</p></div>' +
        '</div></section></div>';

    var TG_SHADOW_WHY_HTML =
        '<div class="word-card grammar-explain-root tg-od-doc py-6 md:py-8 px-0 text-slate-700 text-left max-w-full min-w-0">' +
        '<header class="tg-od-head">' +
        '<h3 class="tg-od-h1">なぜシャドーイングまで実施する必要があるか</h3>' +
        '</header>' +
        '<section class="tg-od-section">' +
        '<h4 class="tg-od-section-title tg-od-section-title--plain">（1）オーバーラッピングとの違い</h4>' +
        '<p class="tg-od-text">オーバーラッピングが「同時発話」で音のつながりを身体に入れる工程だとすれば、シャドーイングは「わずかに遅れて追従」することで、聴覚の予測と発話のタイミングを微調整する工程です。</p>' +
        '<p class="tg-od-text tg-od-text--break-gap">実会話では相手の発話に合わせて自分の発話タイミングをずらす場面が多く、わざと遅延を入れた追従訓練がそのまま効きます。</p>' +
        '</section>' +
        '<section class="tg-od-section">' +
        '<h4 class="tg-od-section-title tg-od-section-title--plain">（2）知覚の自動化を目指す理由</h4>' +
        '<p class="tg-od-text">シャドーイングは、聞き取りの負荷を下げつつ、発話の正確さを保つための最終調整として有効です。オーバーラッピングで土台ができたあとに取り組むことで、意味の処理と発話の処理を並行して回せるようになります。</p>' +
        '<p class="tg-od-text tg-od-text--break-gap">詰まったら Sound Change やオーバーラッピングに戻り、弱点を潰してから再開してください。</p>' +
        '</section>' +
        '<section class="tg-od-section">' +
        '<h4 class="tg-od-section-title tg-od-section-title--plain">（3）日常のリスニングへの効き方</h4>' +
        '<p class="tg-od-text">英語の音が「予測可能」になると、リスニング時の認知負荷が下がり、内容理解に回せるリソースが増えます。</p>' +
        '<p class="tg-od-text tg-od-text--break-gap">シャドーイングは、その予測回路を発話側からも補強するトレーニングです。</p>' +
        '</section>' +
        '<div class="tg-od-compare-block">' +
        '<p class="tg-od-compare-heading">工程のイメージ</p>' +
        '<div class="tg-od-table-wrap--pro"><table class="tg-od-table-pro"><thead><tr>' +
        '<th scope="col">段階</th><th scope="col">目的</th><th scope="col">ポイント</th></tr></thead><tbody>' +
        '<tr><td>Sound Change</td><td>変化のルールを理解する</td><td>耳と目で仕組みを一致させる</td></tr>' +
        '<tr><td>オーバーラッピング</td><td>同時発話でリズムを取り込む</td><td>モデルと完全に同じ拍で発話</td></tr>' +
        '</tbody></table></div></div></div>';

    var TRAINING_GUIDE_VIDEO_LABEL = 'トレーニングのデモ動画';
    /**
     * 解説モーダル（openTrainingGuide）の動画。キーは training.html の currentApp と一致させる。
     * Web 再生向けは H.264（AVC）＋ AAC が無難。Canva 等の再エンコードは H.265/HEVC になり、環境によっては再生不可。
     * 空ファイル・Git LFS ポインタのみでは再生できない。LFS 利用時は git lfs pull または実バイナリをコミット。
     */
    var TRAINING_GUIDE_VIDEO_SRCS = {
        /** パスはリポジトリ上の実名と完全一致（Linux は大小文字区別）。重複がある場合は再生確認済みの方を指定する。 */
        vocabulary: [{ src: 'content/videos/training-guides/Vocabulary.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }],
        pronunciation: [{ src: 'content/videos/training-guides/Pronunciation.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }],
        grammar: [{ src: 'content/videos/training-guides/Grammar.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }],
        shadowing: [{ src: 'content/videos/training-guides/Shadowing.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }],
        reading: [{ src: 'content/videos/training-guides/Reading.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }],
        topicTalk: [{ src: 'content/videos/training-guides/Topic Talk.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }],
        speaking: [{ src: 'content/videos/training-guides/Speaking Form.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }],
        chunk: [{ src: 'content/videos/training-guides/Sentence Building.MP4', label: TRAINING_GUIDE_VIDEO_LABEL }]
    };

    /** ヘッダー直下の3行説明（getTrainingMeta） */
    var TRAINING_META = {
        vocabulary: { description: '【知識データベース】の強化\n・英語の理解スピードと表現の幅が劇的に向上します。\n・語彙力と反応速度を鍛え、英語力の土台を固めます。' },
        pronunciation: { skillIcon: 'audio-lines', skillText: 'Phonetic Accuracy', description: '【知識データベース・音声化】の強化\n・リスニング力と相手に一度で伝わる発音を身につけます。\n・音のメカニズムを理解し、カタカナ英語の脱却を目指します。' },
        grammar: { skillIcon: 'book-open-check', skillText: 'Structural Clarity', description: '【知識データベース】の強化\n・文の組み立てと意味の繋がりが明確になります。\n・文法構造を定着させ、正確な会話の基盤を作ります。' },
        shadowing: { skillIcon: 'headphones', skillText: 'Listening Fluency', description: '【音声知覚】の強化\n・英語のリズムや強弱、イントネーションが身につきます。\n・英語特有の音声変化を理解し、ネイティブの会話を聞き取る力を養います。' },
        reading: { skillIcon: 'book-marked', skillText: 'Logical Reading', description: '【意味理解】の強化\n・英語の解釈および理解力を鍛えます。\n・会話の要点や詳細を素早く把握できるようになります。' },
        topicTalk: { skillIcon: 'message-circle', skillText: 'Opinion Delivery', description: '【概念化】の強化\n・自分の意見を論理的に英語で述べる力を鍛えます。\n・テーマに対する思考と表現のバリエーションを広げます。' },
        speaking: { skillIcon: 'message-square', skillText: 'Speaking Framework', description: '【文章化】の強化\n・日本語的な表現を脱却し、英語として自然な形で話す力を身につけます。\n・スピーキング時のフォームを改善しながら、実践的な会話力を高めます。' },
        chunk: { skillIcon: 'layers', skillText: 'Response Speed', description: '【文章化】の強化\n・瞬時に文を組み立てる反応速度を鍛えます。\n・文章単位で文を組み立て、スムーズな発話へ繋げます。' }
    };

    var MODE_LABELS = {
        defaultModes: ['表示', '確認'],
        vocabulary: ['単語リスト', '保存リスト', '確認テスト'],
        pronunciation: ['解説', '参考動画', '確認テスト'],
        grammar: ['解説', '確認テスト'],
        chunk: ['文章リスト', '保存リスト', '確認テスト']
    };

    /** MediaError で区別できない／コードが取れない場合の汎用メッセージ */
    var TG_VIDEO_LOAD_ERROR =
        '動画を読み込めませんでした。次を確認してください：① 動画 URL が 404 になっていない（サーバーではファイル名の大文字・小文字が一致しているか）② 中身のある MP4 か（空ファイルや Git LFS 未取得のポインタだけでは再生不可）③ Canva 等の H.265（HEVC）は環境によって不可。H.264（AVC）＋ AAC で書き出す。';
    /** code 2: MEDIA_ERR_NETWORK — よくあるのはパス違い・404・オフライン */
    var TG_VIDEO_LOAD_ERROR_NETWORK =
        '動画ファイルを取得できませんでした（ネットワーク、または URL・パスが間違っている可能性）。本番環境ではファイル名の大文字・小文字がリポジトリと一致しているか、デプロイに `content/videos/...` が含まれているか確認してください。';
    /** code 3: MEDIA_ERR_DECODE — データ破損・空ファイル・プレースホルダー */
    var TG_VIDEO_LOAD_ERROR_DECODE =
        '動画をデコードできませんでした。ファイルが壊れているか、空のプレースホルダーの可能性があります。実体のある H.264（AVC）＋AAC の MP4 で上書きしてください。';
    /** code 4: MEDIA_ERR_SRC_NOT_SUPPORTED — HEVC 等、非対応コーデック */
    var TG_VIDEO_LOAD_ERROR_SRC =
        'このブラウザで再生できない形式です。Canva 等の H.265（HEVC）書き出しは避け、H.264（AVC）映像＋ AAC 音声の MP4 に再エクスポートしてください。';

    /** training.html 内の UI 文言（HTML から分離） */
    var TRAINING_UI = {
        /** Sentence Building ヘッダー（アイコン＋ラベル、ピル背景なし） */
        badgePoint: 'Point',
        badgeTodaysPoint: '今日のポイント',
        pickUpPhrases: 'Pick Up フレーズ',
        articleBody: '本文',
        loading: '読み込み中...',
        savedEmptyTitle: 'まだ保存がありません',
        savedEmptyVocabSub: '単語カードの表面でブックマークをタップすると、<br>ここに一覧表示されます。',
        savedEmptyChunkSub: '文章の表面でブックマークをタップすると、<br>ここに一覧表示されます。',
        vocabQuizInstruction: '正しい日本語の意味を選んでください。',
        /** Vocabulary / Grammar 確認テストの進捗横（英語表記のまま） */
        quizExamThisTime: 'This time: {n}/{total}',
        quizExamLastTime: 'Last time: {p}% correct',
        quizExamLastTimeNone: 'Last time: —',
        chunkExamHint: '表示された文章を声に出して言ってください。',
        chunkMemoKicker: '周回メモ',
        chunkMemoUnit: '周目',
        chunkMemoAria: '現在何周目か（2桁まで）',
        chunkMemoDecAria: '1周回減らす',
        chunkMemoIncAria: '1周回増やす',
        chunkMemoTriggerAria: '学習周回カウンタ',
        chunkMemoPopoverTitle: '周回メモ',
        /** Speaking Form 解説：Sentence Building の Point 行と同系 UI */
        speakingPointLabel: '自然な英語表現にするためのPoint',
        /** Speaking Form 確認テスト：同上＋本アイコン */
        speakingRuleHeading: 'スピーキング実施時のRule',
        reviewRationale: '解説',
        portalErrDefault: 'データを読み込めませんでした。',
        portalErrSub: 'GAS の Web アプリ URL とユーザー ID を確認してください。数分待ってから再度お試しください。script.google.com の権限承認もご確認ください。',
        portalErrBadJson: 'サーバーから正しいデータが返りませんでした。',
        portalErrNoData: '学習データを取得できませんでした。',
        portalErrInit: '画面の初期化に失敗しました。',
        portalErrNetwork: 'ネットワークエラーが発生しました。',
        portalErrFetch: '通信に失敗しました。',
        portalErrAccessDenied: 'このアクセスキーは利用できません（解約・停止済み）。',
        portalErrAccessDeniedSub: 'お心当たりがない場合はサポートまでご連絡ください。',
        countSuffix: '件',
        sepDot: '・',
        /** トレーニング手順モーダル内デモ動画 */
        tgVideoSkipBackAria: '10秒戻る',
        tgVideoScrubAria: '再生位置を変更',
        ttMicDenied: 'マイクを利用できません',
        ttMicUploading: 'アップロード中...',
        ttMicSaved: '保存しました',
        ttMicUploadFail: 'アップロードに失敗しました',
        ttMicRecording: '録音中… タップで停止'
    };

    global.KeptyTrainingGuidesJa = {
        TRAINING_GUIDES: TRAINING_GUIDES,
        TG_OVERLAP_DETAIL_HTML: TG_OVERLAP_DETAIL_HTML,
        TG_SHADOW_WHY_HTML: TG_SHADOW_WHY_HTML,
        TRAINING_GUIDE_VIDEO_SRCS: TRAINING_GUIDE_VIDEO_SRCS,
        TRAINING_META: TRAINING_META,
        MODE_LABELS: MODE_LABELS,
        TG_VIDEO_LOAD_ERROR: TG_VIDEO_LOAD_ERROR,
        TG_VIDEO_LOAD_ERROR_NETWORK: TG_VIDEO_LOAD_ERROR_NETWORK,
        TG_VIDEO_LOAD_ERROR_DECODE: TG_VIDEO_LOAD_ERROR_DECODE,
        TG_VIDEO_LOAD_ERROR_SRC: TG_VIDEO_LOAD_ERROR_SRC,
        TRAINING_UI: TRAINING_UI
    };
})(typeof window !== 'undefined' ? window : this);
