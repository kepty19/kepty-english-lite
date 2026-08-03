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
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">英単語の知識をふやして、英語の土台を強くする。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">英語がわかりやすくなり、自分の言いたいことを言いやすくなります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">英単語を見て、1〜2秒以内に「イメージ」を思いうかべる</p><p class="tg-step-desc">イメージがうかんだら音読はとばして、すぐに次の単語へ進みます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">思い出せないときは「例文の音読」と「音声の再生」をすぐ行う</p><p class="tg-step-desc">3秒かんがえても出ないときは、ねばらず正解を見て、英語の例文を3回音読します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">区切りまで来たら「最初のレッスン」からやりなおす</p><p class="tg-step-desc">2〜3周は全部の単語に「浅く広く」ふれて、見る回数をふやすことに集中します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">4周目からは「保存リスト」で苦手だけをなくす</p><p class="tg-step-desc">3周で覚えられなかった単語だけを「保存リスト」に入れて、ぜんぶ覚えきるまでやります。</p></div></div>' +
            '</div>',

        pronunciation:
            '<h3 class="tg-title">Pronunciation</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">正しい音の出し方を身につける。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">聞き取りが楽になり、相手に一回で伝わる発音が身につきます。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「解説」タブを読んで、音のしくみを理解する</p><p class="tg-step-desc">口・舌・のどの使い方を、友だちに説明できるくらいまでしっかり覚えます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">「参考動画」を見て、口の動きを目でも確認する</p><p class="tg-step-desc">実際の口の動きを見て、自分でもその音が出せるイメージをつくります。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">「確認テスト」で音声を聞いてから「3回」言う</p><p class="tg-step-desc">1単語ずつ「音声再生 → できるだけ同じようにまねる」を3回くり返します。口と舌の動きを合わせることに集中します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">単語セットを「5周」くり返して身につける</p><p class="tg-step-desc">6単語すべてを5周（1単語で合計15回）言って、考えなくても正しい音が出るところまでやります。</p></div></div>' +
            '</div>',

        grammar:
            '<h3 class="tg-title">Grammar</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">英文のルールを身につけて、土台をしっかり作る。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">むずかしい内容も正確に伝えられて、あとから伸びにくくなるのを防ぎます。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「解説」タブを読んで、文法のルールを理解する</p><p class="tg-step-desc">友だちに説明できるくらいわかったらOK。ルールをしっかりつかみます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">「確認テスト」で全20問を解く</p><p class="tg-step-desc">入れた知識がちゃんと身についているかを、問題でたしかめます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">答えを見て、自分の理解をチェックする</p><p class="tg-step-desc">まちがえた問題や自信がなかったところは、もう一度「解説」にもどって、きちんとわかるまでやります。</p></div></div>' +
            '</div>',

        shadowing:
            '<h3 class="tg-title">Shadowing</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">英語の音を、考えなくても聞きとれるようにする。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">音のつながりや省略に強くなって、リスニングが楽になります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ 意味を理解する</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">文字を見ずに音声だけ聞いて、いまどのくらいわかるか確認する</p><p class="tg-step-desc">音だけでどこまでわかるかをつかみます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">英文を見て、文字と音を合わせる</p><p class="tg-step-desc">聞きとれなかったところを見つけます。もう理解できていたら手順3はとばしてOK。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">日本語訳を見て、話の流れと意味をしっかりつかむ</p><p class="tg-step-desc">英文だけではわかりにくい意味のちがいを理解して、わからなさをなくします。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ 音を体に入れる</span></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">「Sound Change」タブで音の変化をたしかめる</p><p class="tg-step-desc">Linking・Reductionなどのポイントを目で見て、発音の「しくみ」をしっかり覚えます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">5</div><div class="tg-step-body"><p class="tg-step-title">「Sound Change」を見ながら「オーバーラッピング」を5〜10回行う</p><p class="tg-step-desc">音の変化に気をつけながら、お手本の音声と同時に発音して、口を英語のリズムに合わせます。</p></div></div>' +
            '<div class="tg-overlap-cta-wrap"><button type="button" class="tg-inline-help-link" onclick="openTgOverlapDetail()" aria-label="オーバーラッピングの詳しい説明を開く"><span class="tg-inline-help-link-text">なぜオーバーラッピングが大事か？</span><span class="tg-inline-help-tap-stack" aria-hidden="true"><span class="tg-inline-help-tap-label">クリック</span><i data-lucide="mouse-pointer-click" class="tg-inline-help-tap-ic"></i></span></button></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 3 ─ 聞きとりを考えなくてもできるようにする</span></div>' +
            '<div class="tg-step"><div class="tg-num">6</div><div class="tg-step-body"><p class="tg-step-title">文字を見ずに、0.5秒おくれて言う「シャドーイング」を行う</p><p class="tg-step-desc">つまったら Phase 2 にもどります。考えなくても音がまねできるところまでやります。</p></div></div>' +
            '<div class="tg-overlap-cta-wrap"><button type="button" class="tg-inline-help-link" onclick="openTgShadowWhyDetail()" aria-label="シャドーイングまで行う理由を開く"><span class="tg-inline-help-link-text">なぜシャドーイングまで必要か？</span><span class="tg-inline-help-tap-stack" aria-hidden="true"><span class="tg-inline-help-tap-label">クリック</span><i data-lucide="mouse-pointer-click" class="tg-inline-help-tap-ic"></i></span></button></div>' +
            '<div class="tg-tip"><span class="tg-tip-label">💡 4日間の学習サイクル</span><div class="tg-tip-cols">' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">1日目</span><span class="tg-tip-copy">手順(1)〜(5)中心。音の「設計図」を頭の中に作る。</span></div>' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">2日目</span><span class="tg-tip-copy">シャドーイングを勉強の時間いっぱいくり返す。</span></div>' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">3日目</span><span class="tg-tip-copy">2日目と同じようなくり返し。最後の1回をLINEで提出してフィードバックをもらう。（音声提出1回目）</span></div>' +
            '<div class="tg-tip-row tg-tip-split"><span class="tg-tip-day">4日目</span><span class="tg-tip-copy">フィードバックを意識して、3日目と同じくくり返す。さいごの1回をLINEで提出。（音声提出2回目）</span></div>' +
            '</div></div></div>',

        reading:
            '<h3 class="tg-title">Reading</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">意味をつかむ速さを上げる。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">うしろにもどって読むくせをやめて、英語の語順のまま理解できるようになります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「Pickup Phrases」を見て、大事な単語を先に入れる</p><p class="tg-step-desc">知らないことばで頭が止まるのをふせいで、スムーズに読む土台を作ります。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">本文を英語の語順どおり、前から順番に読む</p><p class="tg-step-desc">日本語の語順に入れかえず、英語が流れてくる順番で意味をつかみます。うしろにもどって読むのはやめます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">むずかしいところは「スラッシュリーディング」でかたまりごとに理解する</p><p class="tg-step-desc">じょうほうのかたまり（チャンク）で読む感覚を本文にいかして、理解する速さを上げます。</p></div></div>' +
            '</div>',

        topicTalk:
            '<h3 class="tg-title">Topic Talk</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">考えをまとめて話す力を強くする。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">結論→理由→具体例とつなげる、すじの通った話し方が身につきます。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ アプリでくり返し練習</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">トピックを選んで、30〜60秒で「話の組み立て」を考える</p><p class="tg-step-desc">PREP法（結論→理由→具体例→結論）を使って、自分の立場をはっきり決めます。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">選んだトピックで30〜60秒スピーチする</p><p class="tg-step-desc">組み立てに沿って声に出して話します。なめらかさより、すじのつながりを大切にします。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">スピーチの直後にふりかえり、すじのずれを直す</p><p class="tg-step-desc">自分の立場ははっきりか／理由はすじが通っているか／具体例はくわしいかを確認します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">納得できるまで(2)〜(3)をくり返し、できたら次のトピックへ</p><p class="tg-step-desc">「スムーズですじが通って言えた」と感じるまでうまくします。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ 公式LINE 確認テスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">5</div><div class="tg-step-body"><p class="tg-step-title">まだやっていないトピックを選び、LINEのマイクで音声を提出する</p><p class="tg-step-desc">練習したものではなく、「新しいトピック」に初めて挑戦します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">6</div><div class="tg-step-body"><p class="tg-step-title">AIのフィードバックを見て、スピーチを冷静にチェックする</p><p class="tg-step-desc">自分の感覚とAIの評価をくらべて、その日に直すところをはっきりさせます。</p></div></div>' +
            '</div>',

        speaking:
            '<h3 class="tg-title">Speaking Form</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">英語らしい考え方で文を作れるようにする。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">ネイティブが自然に感じる「英語らしい」表現ができるようになります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ 入れる学習と型を身につける</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">「解説」を読んで、テーマとポイントを理解する</p><p class="tg-step-desc">なぜその言い方が「英語らしい」のか、理由を納得します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">5つの例文を、1文につき「5回連続」で音読する</p><p class="tg-step-desc">テーマとポイントに気をつけながら1文を5回ずつていねいに読み、英語の型を身につけます。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ ルール付きで自分の口から出す</span></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">「確認テスト」のトピックと「ルール」を確認する</p><p class="tg-step-desc">禁止や挑戦のルールは、学んだ「英語らしい考え方」を自然に使うためのしかけです。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">ルールを守って、30〜60秒のスピーチを作って話す</p><p class="tg-step-desc">日本語っぽいかんがえをやめて、ルールに沿って「英語の視点」で文を作る練習に集中します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">5</div><div class="tg-step-body"><p class="tg-step-title">納得できるまでくり返し、自分でOKとする</p><p class="tg-step-desc">LINEへの音声提出は不要です。型がしっかり身についてから次の課題へ進みます。</p></div></div>' +
            '</div>',

        chunk:
            '<h3 class="tg-title">Sentence Building</h3>' +
            '<div class="tg-meta">' +
            '<div class="tg-meta-block"><span class="tg-meta-label">目的</span><p class="tg-meta-title">英文をすばやく作る力を伸ばす。</p></div>' +
            '<div class="tg-meta-block"><span class="tg-meta-label">できるようになること</span><p class="tg-meta-desc">頭の中の知識をすぐに口から出せるようになり、返事が速くなります。</p></div>' +
            '</div>' +
            '<span class="tg-section-label">トレーニング手順</span>' +
            '<div class="tg-steps">' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 1 ─ たくさん速く出す（1〜3周）#文章リスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">1</div><div class="tg-step-body"><p class="tg-step-title">日本語を見て「5秒以内」に全文を言う</p><p class="tg-step-desc">最大5秒で言えたら次へ。つまったらすぐに英文を見て、音声に合わせて3回音読します。</p></div></div>' +
            '<div class="tg-step"><div class="tg-num">2</div><div class="tg-step-body"><p class="tg-step-title">1テーマにとどまらず、レッスン全体を「浅く・速く」回す</p><p class="tg-step-desc">全テーマの文に何度も出会うことを優先して、このレッスンを3周くり返します。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 2 ─ 苦手をなくして考えなくても言えるようにする（4周目〜）#保存リスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">3</div><div class="tg-step-body"><p class="tg-step-title">5秒以上かかった文を「保存リスト」に入れて、やり切る</p><p class="tg-step-desc">「もう言えるもの」ばかりくり返すむだをなくし、まだうまくいかない文の形・語順だけをくり返します。</p></div></div>' +
            '<div class="tg-phase"><span class="tg-phase-badge"><i data-lucide="waypoints"></i></span><span class="tg-phase-text">Phase 3 ─ 確認テスト #確認テスト</span></div>' +
            '<div class="tg-step"><div class="tg-num">4</div><div class="tg-step-body"><p class="tg-step-title">ランダムに出る30問に、スムーズに答える</p><p class="tg-step-desc">「保存リスト」がゼロになってから行います。速さと正しさにしっかり集中します。</p></div></div>' +
            '</div>'
    };

    var TG_OVERLAP_DETAIL_HTML =
        '<div class="word-card grammar-explain-root tg-od-doc py-6 md:py-8 px-0 text-slate-700 text-left max-w-full min-w-0">' +
        '<header class="tg-od-head tg-od-head--spaced">' +
        '<h3 class="tg-od-h1">シャドーイングの前に「オーバーラッピング」が必要な理由</h3>' +
        '<h4 class="tg-od-section-title--plain tg-od-kicker-plain">（1）なぜ、いきなりシャドーイングはよくない？</h4>' +
        '</header>' +
        '<div class="tg-od-conclusion-wrap">' +
        '<p class="tg-od-conclusion-label">結論</p>' +
        '<p class="tg-od-conclusion-text">英語の音の変化を「聞きとる」→「まねて出す」の順で、頭と口に入れる必要があります。</p></div>' +
        '<p class="tg-od-text">オーバーラッピングは、お手本の音声と同時に話して、音のつながりとリズムを体に覚えさせる練習です。いきなりおくれ付きのシャドーイングに入ると、まだ耳が追いつけない音を無理にまねて、形がくずれやすくなります。</p>' +
        '<p class="tg-od-text tg-od-text--tight">先に Sound Change でしくみを理解し、オーバーラッピングで「同時に話す」ことに慣れてから、0.5秒おくれのシャドーイングへ進むとやりやすいです。</p>' +
        '<ul class="tg-od-bullets"><li>同時に話すことで、口の運びとリズムを合わせられる</li>' +
        '<li><strong>聞きとれない音</strong>を、その場で直せる</li>' +
        '<li>シャドーイングは「あとからついていく」次の段階として効く</li></ul>' +
        '<p class="tg-od-text">この順番をとばすと、シャドーイングがただの暗記になって、音の変化に対する感覚が育ちにくくなります。</p>' +
        '<section class="tg-od-section tg-od-section--merit">' +
        '<h4 class="tg-od-section-title--plain">（2）オーバーラッピングの効果</h4>' +
        '<p class="tg-od-text">お手本と<strong>同じタイミング</strong>で話すことで、英語のリズム・つながり・弱い音が体で再現できるようになります。</p>' +
        '<p class="tg-od-text">まずは短いフレーズから3セット、慣れたら同じレッスンを通しで回すのがおすすめです。</p>' +
        '<div class="tg-od-numlist-stack">' +
        '<div class="tg-od-numlist-item">' +
        '<p class="tg-od-numlist-title">1. 聞こえた音をそのまま出す</p>' +
        '<p class="tg-od-numlist-body">イメージより「音の形」を優先して、日本語の音にひっぱられないように気をつけます。</p></div>' +
        '<div class="tg-od-numlist-item">' +
        '<p class="tg-od-numlist-title">2. つまずいたら同じところをくり返す</p>' +
        '<p class="tg-od-numlist-body">0.5秒おくれのシャドーに進む前に、同時に話す練習で安定させます。</p></div>' +
        '<div class="tg-od-numlist-item">' +
        '<p class="tg-od-numlist-title">3. ある程度の速さまで上げてから次へ</p>' +
        '<p class="tg-od-numlist-body">むりにテンポだけ上げず、<strong>正しい運び</strong>を保てる範囲で速さを上げます。</p></div>' +
        '</div></section></div>';

    var TG_SHADOW_WHY_HTML =
        '<div class="word-card grammar-explain-root tg-od-doc py-6 md:py-8 px-0 text-slate-700 text-left max-w-full min-w-0">' +
        '<header class="tg-od-head">' +
        '<h3 class="tg-od-h1">なぜシャドーイングまで行う必要があるか</h3>' +
        '</header>' +
        '<section class="tg-od-section">' +
        '<h4 class="tg-od-section-title tg-od-section-title--plain">（1）オーバーラッピングとのちがい</h4>' +
        '<p class="tg-od-text">オーバーラッピングが「同時に話す」で音のつながりを体に入れる練習だとすれば、シャドーイングは「少しおくれてついていく」ことで、耳の予想と話すタイミングを細かく合わせる練習です。</p>' +
        '<p class="tg-od-text tg-od-text--break-gap">実際の会話では、相手の話に合わせて話すタイミングをずらすことが多く、わざとおくらせてついていく練習がそのまま役立ちます。</p>' +
        '</section>' +
        '<section class="tg-od-section">' +
        '<h4 class="tg-od-section-title tg-od-section-title--plain">（2）聞きとりを考えなくてもできるようにする理由</h4>' +
        '<p class="tg-od-text">シャドーイングは、聞き取りの負担を下げつつ、発音の正しさを保つためのさいごの仕上げとして役立ちます。オーバーラッピングで土台ができたあとにやると、意味を考えることと話すことを同時に進めやすくなります。</p>' +
        '<p class="tg-od-text tg-od-text--break-gap">つまったら Sound Change やオーバーラッピングにもどって、苦手をつぶしてから再開してください。</p>' +
        '</section>' +
        '<section class="tg-od-section">' +
        '<h4 class="tg-od-section-title tg-od-section-title--plain">（3）ふだんのリスニングにどう効くか</h4>' +
        '<p class="tg-od-text">英語の音が「予想しやすい」になると、リスニングのときの頭の負担が減って、内容を考える余裕が増えます。</p>' +
        '<p class="tg-od-text tg-od-text--break-gap">シャドーイングは、その予想する力を、話す側からも強くするトレーニングです。</p>' +
        '</section>' +
        '<div class="tg-od-compare-block">' +
        '<p class="tg-od-compare-heading">工程のイメージ</p>' +
        '<div class="tg-od-table-wrap--pro"><table class="tg-od-table-pro"><thead><tr>' +
        '<th scope="col">段階</th><th scope="col">目的</th><th scope="col">ポイント</th></tr></thead><tbody>' +
        '<tr><td>Sound Change</td><td>変化のルールを理解する</td><td>耳と目でしくみを合わせる</td></tr>' +
        '<tr><td>オーバーラッピング</td><td>同時に話してリズムを取り込む</td><td>お手本とまったく同じ拍で話す</td></tr>' +
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

    /** ヘッダー直下の説明（getTrainingMeta）※Lite: 教科ラベル行なし／小学5〜6年生向け */
    var TRAINING_META = {
        vocabulary: { description: '・知らない英単語がわかるようになって、英語が読みやすくなります。\n・使える言葉が増えて、自分の気持ちを英語で言いやすくなります。' },
        pronunciation: { skillIcon: 'audio-lines', skillText: 'Phonetic Accuracy', description: '・英語の音の出し方がわかって、相手に聞きとってもらいやすくなります。\n・カタカナ読みから一歩進んで、本物の英語の音に近づけます。' },
        grammar: { skillIcon: 'book-open-check', skillText: 'Structural Clarity', description: '・英語の文の作り方がわかって、意味がはっきり読めるようになります。\n・正しい順番で文を組み立てて、ちゃんと通じる話し方が身につきます。' },
        shadowing: { skillIcon: 'headphones', skillText: 'Listening Fluency', description: '・英語のリズムや強弱に慣れて、聞き取りやすくなります。\n・つながって聞こえる音の変化がわかって、ネイティブの会話についていきやすくなります。' },
        reading: { skillIcon: 'book-marked', skillText: 'Logical Reading', description: '・英語の文章の意味を、しっかりつかめるようになります。\n・話の大事なところや細かいところを、早く見つけられるようになります。' },
        topicTalk: { skillIcon: 'message-circle', skillText: 'Opinion Delivery', description: '・自分の考えを、すじの通った英語で言えるようになります。\n・いろいろなテーマについて、言い方のバリエーションが増えます。' },
        speaking: { skillIcon: 'message-square', skillText: 'Speaking Framework', description: '・日本語っぽい言い方をやめて、自然な英語で話せるようになります。\n・話し方の型を練習して、実際の会話で使いやすくなります。' },
        chunk: { skillIcon: 'layers', skillText: 'Response Speed', description: '・文をすばやく組み立てる練習で、返事が速くなります。\n・かたまりで覚えることで、スムーズに話せるようになります。' }
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
