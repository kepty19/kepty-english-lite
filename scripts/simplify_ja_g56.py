#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rewrite Japanese curriculum copy for elementary grade 5–6 readability (Lite only)."""
from __future__ import annotations

import json
import re
from pathlib import Path

import pykakasi

ROOT = Path(__file__).resolve().parents[1]
ALLOW = set(Path(__file__).with_name("g56_kanji.txt").read_text(encoding="utf-8"))
KKS = pykakasi.kakasi()

# ---------------------------------------------------------------------------
# Exact field rewrites (highest priority)
# ---------------------------------------------------------------------------

SPEAKING_REWRITES = [
  {
    "point": "it をうまく使う",
    "background": "・自分の気持ちは入れず、場のようすだけを言う。\n・It + ようすのことば（busy / necessary など）で、その場をあらわす。",
    "assignment": "What was it like at work today?\n\n（今日の仕事のようすはどうでしたか？）",
    "rules": "【禁止】I / We / My を使わない\n【挑戦】It was + (busy / difficult / helpful)",
    "badge": "#視点を変える",
  },
  {
    "point": "There is/are をうまく使う",
    "background": "・自分の感想は後まわし。まず「なにがあったか」を言う。\n・あった／なかった を、There is/are で示す。",
    "assignment": "What was there on your schedule today?\n\n（今日の予定には、なにがありましたか？）",
    "rules": "【禁止】I / We / My を使わない\n【挑戦】数のことば(many / several / little)を1回入れる",
    "badge": "#視点を変える",
  },
  {
    "point": "「したこと」を主語にする",
    "background": "・「わたしがした」ではなく、「おきたこと」として言う。\n・〜ing（動名詞）を主語にして、ようすを固定する。",
    "assignment": "What filled most of your day at work?\n\n（仕事のうち、一日のほとんどをしめたいものは何ですか？）",
    "rules": "【禁止】I / We / My を使わない\n【挑戦】時間（in the morning など）を1つ入れる",
    "badge": "#視点を変える",
  },
  {
    "point": "「原因」を主語にする",
    "background": "・because ばかり使わず、一文で「なぜ → どうなった」を言う。\n・原因そのものを主語にして、動詞でつなぐ。",
    "assignment": "What caused difficulty at work today?\n\n（今日、仕事をたいへんにした原因は何ですか？）",
    "rules": "【禁止】I / We / My を使わない\n【挑戦】動詞 cause / reduce / delay / interrupt を使う",
    "badge": "#視点を変える",
  },
  {
    "point": "「結果」を主語にする",
    "background": "・「だれがしたか」は言わず、決まったことだけを話す。\n・判断や変化そのものを主語にして、はっきりしめくくる。",
    "assignment": "What decision was made today at work?\n\n（今日、しごとばでどんな判断がされましたか？）",
    "rules": "【禁止】I / We / My を使わない\n【挑戦】「判断 → 結果」の形まで言う",
    "badge": "#視点を変える",
  },
  {
    "point": "事実を順番につなげる",
    "background": "・気持ちは入れず、だれがやっても同じ流れで話す。\n・おきたことを、時間の順にまっすぐ並べる。",
    "assignment": "What issue happened during your work today?\n\n（今日、どんな問題がおきましたか？）",
    "rules": "【挑戦】「発生→たいおう→おさまる」の流れで話す",
    "badge": "#事実の組み立て",
  },
  {
    "point": "変化の「ちがい」をはっきり言う",
    "background": "・「がんばった」ではなく、「どう変わったか」を言う。\n・前のようすと今のようすを、主語でくらべる。",
    "assignment": "What changed for the better in your work today?\n\n（今日、仕事でよくなった変化は何ですか？）",
    "rules": "【挑戦】「Before → After」の変化を具体的に言う",
    "badge": "#事実の組み立て",
  },
  {
    "point": "「多さ」で忙しさをあらわす",
    "background": "・「忙しい」と言うだけでなく、量でしめす。\n・予定やれんらくの「数」や「うまりぐあい」を話す。",
    "assignment": "What made today a busy day at work?\n\n（今日が忙しかった理由は何でしたか？）",
    "rules": "【挑戦】「忙しさ」が「しごと」にどうひびいたか言う",
    "badge": "#事実の組み立て",
  },
  {
    "point": "「流れ」を現在形であらわす",
    "background": "・自分のいち行動ではなく、いつもくり返されるしくみとして話す。\n・ふだんのルーティンを、上から見わたすように話す。",
    "assignment": "What is a normal day at work like?\n\n（ふだんの仕事は、どのような流れですか？）",
    "rules": "【挑戦】すべて「現在形」で、いつもの事実として話す",
    "badge": "#事実の組み立て",
  },
  {
    "point": "会議を「パーツ」でつかまえる",
    "background": "・よかった／わるかったではなく、会議の中身のパーツを並べる。\n・議題・共有・決定など、要素をはっきり置く。",
    "assignment": "What happened in today's meeting?\n\n（今日の会議では何がおきましたか？）",
    "rules": "【禁止】きもちのことば（good/bad など）を使わない\n【挑戦】「パーツ」を3つ以上並べる",
    "badge": "#事実の組み立て",
  },
  {
    "point": "SVOで一度言い切る",
    "background": "・くわしい説明より先に、「何がおきたか」を決める。\n・まず短い文で結論を出し、相手がわかりやすくする。",
    "assignment": "What was confirmed or finished today?\n\n（今日、何が決まって／終わりましたか？）",
    "rules": "【挑戦】最後に「いまのようす」を1文つけ足す",
    "badge": "#じょうほうをけずる",
  },
  {
    "point": "前置詞で情報を「そえる」",
    "background": "・文を長くしすぎず、必要な情報だけを足す。\n・場所・相手・時間を、後ろから軽くつける。",
    "assignment": "What happened today? Where did it happen?\n\n（今日何が、どこでおきましたか？）",
    "rules": "【挑戦】文の終わりに前置詞のかたまりを2つ以上並べない（短く）",
    "badge": "#じょうほうをけずる",
  },
  {
    "point": "becauseは1つにしぼる",
    "background": "・理由をたくさん言わず、いちばん大事な一本だけ言う。\n・一つの事実に、一つの原因を短くつなぐ。",
    "assignment": "Why are you wearing those shoes today?\n\n（なぜ今日そのくつをはいているのですか？）",
    "rules": "【挑戦】becauseを1回だけ使い、10語いねいで理由を言う",
    "badge": "#じょうほうをけずる",
  },
  {
    "point": "文章を2つにわける",
    "background": "・一文にたくさんつめこまず、わかりやすくする。\n・「事実」と「結果」をピリオドでわける。",
    "assignment": "What appeared? How was it handled?\n\n（何がおこり、どうたいしょされましたか？）",
    "rules": "【禁止】and / so / but で文をつなぐ\n【挑戦】短い文2つでリズムをつくる",
    "badge": "#じょうほうをけずる",
  },
  {
    "point": "ようすを「名詞」でしめす",
    "background": "・動作の説明ではなく、状態に名前をつける。\n・「主語 is 名詞（形容詞）」の形で、大切なところを突く。",
    "assignment": "How was the meeting purpose or agenda?\n\n（会議の目的やアジェンダはどうでしたか？）",
    "rules": "【挑戦】「A was B」の形だけで3文つくる",
    "badge": "#じょうほうをけずる",
  },
  {
    "point": "「問題→行動→結果」をつなぐ",
    "background": "・たいおうがなぜよかったかを、すじでしめす。\n・おきたこととたいしょを、まっすぐな線で結ぶ。",
    "assignment": "Describe a problem and how you handled it.\n\n（問題をどうたいしょしたか話してください）",
    "rules": "【禁止】きもち表現を使わない\n【挑戦】たいおうが「何にひびいたか」まで言う",
    "badge": "#原因と結果をはっきり",
  },
  {
    "point": "「変化→影響」の順で話す",
    "background": "・変化がどんな意味かを、相手に正しく届ける。\n・まず事実を言い、つぎにまわりへの影響を言う。",
    "assignment": "What company change affected your work?\n\n（ふだんの仕事にひびいた変化は何ですか？）",
    "rules": "【禁止】個人の感想\n【挑戦】影響を2つ（しごとと全体）あげる",
    "badge": "#原因と結果をはっきり",
  },
  {
    "point": "判断の「理由」をセットにする",
    "background": "・結論のうらにあるかんがえ方を見えるようにする。\n・「決めたこと」と「その理由になった事実」を並べる。",
    "assignment": "What decision was made and why?\n\n（どんな判断が、なぜなされましたか？）",
    "rules": "【挑戦】最後に「その判断はどうだったか」を一言でまとめる",
    "badge": "#原因と結果をはっきり",
  },
  {
    "point": "原因を「はっきり」述べる",
    "background": "・あいまいな言い方を避け、また起きないように考える。\n・何がきっかけで問題が起きたかを、はっきり言う。",
    "assignment": "What kind of problems happen often at work?\n\n（仕事でよく起きる問題は何ですか？）",
    "rules": "【挑戦】同じトラブルをふせぐ「見方」を1文足す",
    "badge": "#原因と結果をはっきり",
  },
  {
    "point": "「おくれ」を前向きに伝える",
    "background": "・おくれを事実としてあつかい、次の一手につなげる。\n・理由・影響・さいかいのきっかけを、セットで話す。",
    "assignment": "What stopped or slowed down the work?\n\n（仕事を止めた／遅くしたものは何でしたか？）",
    "rules": "【挑戦】「また起きないための具体策」を1つ入れる",
    "badge": "#原因と結果をはっきり",
  },
  {
    "point": "形容詞を具体的なようすに変える",
    "background": "・Good/Bad のようなあいまいなことばをやめて、くわしくする。\n・「どうよいのか」を、具体的な単語であらわす。",
    "assignment": "How was the performance of your team?\n\n（チームのできは、どうでしたか？）",
    "rules": "【禁止】good / bad / nice / great を使わない\n【挑戦】ようすを表す形容詞を2つ以上使う",
    "badge": "#くわしくする",
  },
  {
    "point": "「数」と「固有名詞」を入れる",
    "background": "・事実を、できるだけ正確にする。\n・数字や名前を入れて、ぼんやりした言い方をなくす。",
    "assignment": "What was the most important task today?\n\n（今日、いちばん大切だったタスクは何ですか？）",
    "rules": "【挑戦】数字を2つ、固有名詞を1つ以上入れる",
    "badge": "#くわしくする",
  },
  {
    "point": "「五感」の情報を1つ足す",
    "background": "・かたい事実に、その場のリアルさを出す。\n・見た目や音、場の空気を、1つだけつけ加える。",
    "assignment": "What was the atmosphere in the office today?\n\n（今日のオフィスのふんいきはどうでしたか？）",
    "rules": "【挑戦】視覚・聴覚・かんかくのいずれかを1文入れる",
    "badge": "#くわしくする",
  },
  {
    "point": "「比べ」で目立たせる",
    "background": "・それ単独の説明を避け、「くらべてどうか」を示す。\n・「前より〜」「ほかとくらべて〜」でくらべる。",
    "assignment": "How was today's workload compared to yesterday?\n\n（昨日とくらべて、今日の仕事量はどうでしたか？）",
    "rules": "【挑戦】比較級（-er / more）を必ず1回使う",
    "badge": "#くわしくする",
  },
  {
    "point": "「たとえ」でイメージを固める",
    "background": "・むずかしいようすを、だれでもわかる例におろす。\n・like ~ や as if ~ で、イメージを共有する。",
    "assignment": "How would you describe your project status?\n\n（プロジェクトのようすをたとえると？）",
    "rules": "【挑戦】\"like\" を使ったたとえを1つ入れる",
    "badge": "#くわしくする",
  },
  {
    "point": "「点」ではなく「線」で見る",
    "background": "・いちどきりの動作ではなく、つづいている状態を話す。\n・stay / keep / remain で、時間の幅を出す。",
    "assignment": "How did the situation change or stay today?\n\n（今日のようすは変わりましたか、そのままですか？）",
    "rules": "【挑戦】状態のつづき（線）を意識して2文以上つくる",
    "badge": "#時間を意識する",
  },
  {
    "point": "「完了した状態」をキープする",
    "background": "・過去におきたことを、「いま持っている結果」として出す。\n・過去をきりはなさず、いまのようすへのつながりを話す。",
    "assignment": "What have you achieved so far this week?\n\n（今週、これまでに何を達成しましたか？）",
    "rules": "【挑戦】現在完了形（have + 過去分詞）を使う",
    "badge": "#時間を意識する",
  },
  {
    "point": "「いま動いている勢い」をのせる",
    "background": "・止まっている写真ではなく、動いている現場を伝える。\n・いままさに変化・進行しているようすを強調する。",
    "assignment": "What is happening in your project right now?\n\n（プロジェクトで今、何がおきていますか？）",
    "rules": "【挑戦】現在進行形（-ing）で「動き」を出す",
    "badge": "#時間を意識する",
  },
  {
    "point": "「期限」をセットで考える",
    "background": "・時間のわくを決めて、情報にはりを出す。\n・「いつまで」「いつから」の線を引く。",
    "assignment": "What is the most urgent deadline you have?\n\n（今あるいちばん急ぎの期限は何ですか？）",
    "rules": "【挑戦】期限を表す表現（by / within など）を入れる",
    "badge": "#時間を意識する",
  },
  {
    "point": "「未来のようす」を先に言う",
    "background": "・ただの予定ではなく、「こうなる未来」として描く。\n・見とおしを共有して、聞き手を安心させる。",
    "assignment": "What will your work be like next week?\n\n（来週の仕事はどうなっているでしょうか？）",
    "rules": "【挑戦】未来のようす（will be ~）で3文つくる",
    "badge": "#時間を意識する",
  },
]

CHUNK_POINT_MAP = {
"1文に助動詞を2つ使うことはできません。そのため、言い換えを身につけることで、自然な文章の構築が可能になります。":
"1つの文に助動詞を2つは使えません。だから言い方をかえる練習をすると、自然な文が作れるようになります。",
"Be動詞を「文頭に持ってくれば疑問文」になり、Be動詞に「Notをつけると否定文」になります。":
"Be動詞を「文の先頭にもってくると疑問文」になり、Be動詞に「not をつけると否定文」になります。",
"SVOO文型は、OOを入れ替えることが可能。その場合、適切な「前置詞」を設置します。\n（例）I show a picture to you.":
"SVOO文型は、目的語どうしをいれかえできます。そのときはちょうどよい「前置詞」をつけます。\n（例）I show a picture to you.",
"There 構文は、形式的に置く主語であり、「～がある/ない」という意味になります。":
"There 構文は、かたちだけの主語で、「〜がある／ない」という意味になります。",
"Who は、What と同様に主語「Who + 動詞」にも、目的語「Who + 助動詞 + 主語 + 動詞」にもなります。":
"Who は What と同じように、主語「Who + 動詞」にも、目的語「Who + 助動詞 + 主語 + 動詞」にもなります。",
"Whoseは、「だれの○○」を示し、Whichは「どの○○」を示します。":
"Whose は「だれの○○」、Which は「どの○○」を示します。",
"Why don't you~ では、提案や勧誘を表し「~してはどうですか?」や「~しませんか?」という意味になります。":
"Why don't you ~ はすすめの言い方で、「〜してはどう？」や「〜しませんか？」という意味です。",
"be going to は、前もって予定していた未来について。will は、その場で判断した未来に使うことが多いです。":
"be going to は、まえから決まっていた未来。will は、その場で決めた未来によく使います。",
"can は、比較的カジュアルな表現であり、フォーマルな状況では could や may を使うことが一般的です。":
"can はくだけた言い方です。きちんとした場では could や may を使うことが多いです。",
"every●●、some●●、any●●及び no●●は、基本的に単数扱いなので動詞も単数形です。":
"every●●、some●●、any●●、no●●は、だいたい単数あつかいなので、動詞も単数形です。",
"have to の否定形の意味は、「~しなくてもよい」となり、must not「してはならない」とは異なるので注意です。":
"have to の否定は「〜しなくてもよい」です。must not（してはいけない）とちがうので注意しましょう。",
"make、have、let の後に動詞の原形を使い、get の後に不定詞(to + 原形)を使うことに注意します。":
"make / have / let のあとは動詞の原形。get のあとは不定詞（to + 原形）です。まちがえないようにしましょう。",
"so-that「とてもーなので、〜です」のネガティブを表現する形は、[too - to - ]と言い換えることが可能です。":
"so-that（とても〜なので、…です）のマイナス側は、[too - to - ] と言いかえできます。",
"that は、主に制限用法で使用されます。which は、制限/非制限どちらも使用可能です。先行詞は、どちらも物や概念です。":
"that は主に「必要なくわしい説明」で使います。which はどちらでもOKです。前にあることば（先行詞）は、どちらも物やかんがえです。",
"will（単純未来）は、その場で決まった未来の事象について言及する際に使用されます。":
"will（ふつうの未来）は、その場で決まった未来のことを言うときに使います。",
"「How + 形容詞 + SV」は、「What + 形 + 名詞 + SV」の形で、互いに言い換えが可能です。":
"「How + 形容詞 + SV」は「What + 形容詞 + 名詞 + SV」の形に、おたがいに言い換えできます。",
"「●●している」は、「形容詞 + 名詞」で表現。「××で●●している」のように +α の情報がある場合は、分詞は名詞の後に置きます。":
"「●●している」は「形容詞 + 名詞」で表せます。「××で●●している」のように追加の情報があるときは、分詞を名詞のうしろに置きます。",
"「誰が・どうする・誰に」の3つを、まずは一瞬で見つけるクセをつけましょう。\n後ろの to の中身（詳しい説明）は、その後に読めば大丈夫です。":
"「だれが・どうする・だれに」の3つを、まずいっしゅんで見つけるくせをつけましょう。\nうしろの to の中身（くわしい説明）は、あとから読めば大丈夫です。",
"ここまでの文法が習得できていれば、Where のパートは比較的簡単に感じるでしょう。":
"ここまでの文法がわかっていれば、Where のパートはわりと簡単に感じるはずです。",
"まずは、文の基本要素の主語(S)と動詞(V)の形を意識しましょう。":
"まずは、文の基本パーツである主語(S)と動詞(V)のかたちに気をつけましょう。",
"チームの士気を高めたり、試合を振り返る場面。未来を表す助動詞Willや、過去の出来事を表す過去形を使い分けます。":
"チームの元気を高めたり、試合をふりかえる場面です。未来の助動詞 will と、過去形を使いわけます。",
"ピッチ内では短く明確に伝えることが重要。主語を省いた命令文や、現在の状態を伝える現在進行形を意識しましょう。":
"グラウンドでは短くはっきり伝えることが大切。主語を省いた命令文や、いまのようすを伝える現在進行形に気をつけましょう。",
"メディアやファンに向けて、予定や結果、自身の感情をハッキリ伝えるシーンです。":
"メディアやファンに向けて、予定や結果、自分の気持ちをはっきり伝える場面です。",
"一般動詞の場合と文章構造は同じ。違いは、動詞の形が「現在形から過去形」に置き換わるだけです。":
"一般動詞のときと文のつくりは同じ。ちがいは、動詞が「現在形→過去形」にかわるだけです。",
"不定詞の動作の行為者を示す場合は、「it is...for」、人の性質を表す場合は「it is...of」を用います。":
"不定詞の「だれがするか」を示すときは it is...for。人のせいしつを言うときは it is...of を使います。",
"不定詞の名詞的用法は、動名詞と書き換えが可能です。":
"不定詞の名詞的用法は、動名詞と言いかえできます。",
"主格の関係代名詞は、先行詞とイコールになります。過去分詞形容詞修飾と置き換え可能なものもあります。":
"主格の関係代名詞は、前のことば（先行詞）と同じものを指します。過去分詞で名詞をかざる言い方と入れかえできるものもあります。",
"体の状態を伝える動詞や、ファン・友人とのリラックスした会話で使う助動詞が中心です。":
"体のようすを伝える動詞や、ファン・友だちとのくだけた会話で使う助動詞が中心です。",
"分割すると意味が通じなくなるものが「間接疑問文」、文章を分割しても意味がわかるものが「関係代名詞」です。":
"分けてしまうと意味が通じなくなるのが「間接疑問文」。分けても意味がわかるのが「関係代名詞」です。",
"副詞的用法は、「~ために」「~して、○○」となり、形容詞や動詞を修飾する働きを持ちます。":
"副詞的用法は「〜ために」「〜して、○○」という意味で、形容詞や動詞をくわしくします。",
"助動詞を活用する場合、動詞は常に原形になります。\nまた、文頭に動かしたり、not をつけたりするのも、動詞ではなく助動詞になります。":
"助動詞を使うとき、うしろの動詞はいつも原形です。\n文の先頭に動かしたり not をつけたりするのも、動詞ではなく助動詞です。",
"動名詞は、名詞・目的語として使用できます。いくつかの動詞は、必ず動名詞を伴うものがあります。":
"動名詞は、名詞や目的語として使えます。いくつかの動詞は、必ず動名詞をともないます。",
"動詞が「自動詞」の時、目的語を要する際は「前置詞」が必要です。\n（例）I look at a picture.":
"動詞が「自動詞」のとき、あとにもの・相手をつけるなら「前置詞」が必要です。\n（例）I look at a picture.",
"単語の間違いやニュアンスの違いよりも、「文法の形」が合っているかが重要です。":
"単語のまちがいや、ほんの小さな意味の差より、「文法のかたち」が合っているかが大切です。",
"原級比較の基本の形は、[as形 / 副as]です。否定形では「●●ほどない」となります。":
"原級のくらべ方の基本は [as 形 / as] です。否定では「●●ほど〜ない」になります。",
"命令系でも「Don't be late - 遅れないでね」など強い意味でなくフランクに使用されるものも多くあります。":
"命令文でも、「Don't be late（遅れないでね）」のように、きつくなく気軽に使うものも多いです。",
"基本の形は、「have + p.p(動詞過去分詞)」で、意味には「継続・経験・完了/結果」の3つがあります。":
"基本のかたちは「have + 過去分詞」です。意味は「つづき・けいけん・完了／結果」の3つがあります。",
"基本的には、疑問詞を用いる際は【疑問詞 + 疑問文?】の形を取ります。":
"だいたい、疑問詞を使うときは【疑問詞 + 疑問文?】のかたちになります。",
"形容詞用法は、「~のための●●」「〜すべき○○」というように名詞を修飾します。":
"形容詞用法は、「〜のための●●」「〜すべき○○」のように、名詞をくわしくします。",
"形式主語 Itは、「天気/時間/温度/日付/距離/程度」など様々なものの主語として機能します。":
"かたちだけの主語 It は、「天気／時間／温度／日付／きょり／ていど」など、いろいろなものの主語になります。",
"所有格関係代名詞は、his や her の代理となります。名詞とくっつき「●●の名詞」となります。":
"所有格の関係代名詞は、his や her のかわりです。名詞とくっついて「●●の名詞」になります。",
"接続詞は、文と文をつなぐため、「接続詞 + SV」の形をとります。":
"接続詞は文と文をつなぐので、「接続詞 + 主語 + 動詞」のかたちになります。",
"文の途中に出てくる疑問詞の後ろは、「疑問文の形」ではなく、いつも通りの「主語 + 動詞」の順番に並べましょう。":
"文の途中に出てくる疑問詞のうしろは、疑問文のかたちではなく、いつもどおり「主語 + 動詞」の順に並べましょう。",
"文章が成り立つためには、「主語 + 動詞の形」は欠かせません。その部分に気をつけましょう。":
"文が成り立つには「主語 + 動詞」が欠かせません。その部分に気をつけましょう。",
"文章構造は Be 動詞現在形と同じです。\n「am/is → was」、「are → were」の二種類になります。":
"文のつくりは Be 動詞の現在形と同じです。\n「am/is → was」、「are → were」の2種類になります。",
"最上級の基本の形が、[the-est / the most]です。good の変化は better、the best となります。":
"最上級の基本のかたちは [the -est / the most] です。good は better、the best になります。",
"比較級の基本の形は、[-er / more-]です。beautiful などの3音節以上には、基本的に more を使います。":
"比較級の基本のかたちは [-er / more -] です。beautiful などの音が3つ以上あることばには、だいたい more を使います。",
"疑問詞 + 主語 + 動詞までを一息に出せるようになれば、この疑問詞パートは完璧です。":
"疑問詞 + 主語 + 動詞までを、ひと続きで言えるようになれば、この疑問詞パートはかんぺきです。",
"疑問詞 How は、方法、状態、程度、頻度、期間など、さまざまな情報を求める表現として使えます。":
"疑問詞 How は、やり方・ようす・ていど・ひんど・きかんなど、いろいろな情報を聞くときに使えます。",
"知覚（視覚、聴覚、触覚など）を表す動詞を使う際、to不定詞ではなく、動詞は原形となります。":
"見る・聞く・ふれるなどの動詞を使うとき、to 不定詞ではなく、動詞は原形になります。",
"能動態は、by の後を主語に置き換えることで、受動態の文章に書き換えが可能です。":
"能動態は、by のうしろを主語にいれかえると、受動態の文に書きかえできます。",
"自身のキャリアや日本のサッカー事情を具体的に伝える場面です。":
"自分のけいれきや、日本サッカーのようすを、具体的に伝える場面です。",
"過去分詞の形容詞修飾は、現在分詞修飾と同様に、+α の情報があるかどうかで置く場所が変わります。":
"過去分詞で名詞をかざるときも、現在分詞と同じく、追加の情報があるかで置く場所が変わります。",
"過去進行形は、「was/were + ing」で、過去のある時点で継続して行われていた動作や出来事を強調します。":
"過去進行形は「was/were + -ing」で、過去のあるときに続いていた動作やできごとを強調します。",
}

# Phrase replacements (longest-first). Applied after exact maps.
PHRASES = [
("知識データベース", "英語の土台になる知識"),
("期待できる効果", "できるようになること"),
("客観視し", "気持ちを入れずにようすだけを見て"),
("客観的に把握", "じぶんの理解を冷静にチェック"),
("客観的評価", "公正な評価"),
("客観的な", "きもちを入れない"),
("客観視する", "きもちを入れずに見る"),
("個人の感情を排除する", "自分のきもちは言わない"),
("感情を排除", "きもちは入れない"),
("主観を入れず", "自分の感想は入れず"),
("描写する", "あらわす"),
("構築する", "組み立てる"),
("構築が可能", "組み立てができる"),
("文章の構築", "文の組み立て"),
("活用する", "うまく使う"),
("活用する場合", "使うとき"),
("イコールの関係", "「同じもの」の関係"),
("イコール関係", "「同じもの」の関係"),
("イコールであり", "「＝（同じ）」で、"),
("先行詞", "先行詞（前にあることば）"),
("制限用法", "制限用法（必要な説明）"),
("非制限", "非制限（追加の説明）"),
("論理的に理解", "すじを追って理解"),
("論理的に", "すじだって"),
("論理的な", "すじの通った"),
("論理性", "すじの通りやすさ"),
("咀嚼する", "しっかり理解する"),
("腹に落とす", "納得する"),
("刷り込み", "体にしみこませること"),
("アウトプット", "自分の口で出す練習"),
("インプット", "入れる学習"),
("メカニズム", "しくみ"),
("物理的な動き", "口や舌の動き"),
("視覚的に補完", "目で見てうめる"),
("音声知覚", "音を聞きとること"),
("自動化", "考えなくてもできること"),
("知覚の自動化", "聞きとりを考えなくてもできること"),
("高回転", "たくさんくり返す"),
("弱点排除", "苦手をなくす"),
("徹底撃破", "やり切ってなくす"),
("全神経を集中", "いちばん集中"),
("劇的に向上", "ぐんとアップ"),
("伸び悩み", "うまく伸びなくなること"),
("解像度", "くわしい度合い"),
("透明化", "見えるようにする"),
("再発防止", "また起きないようにすること"),
("建設的に", "前向きに"),
("俯瞰して", "全体を見わたして"),
("事象として", "おきたこととして"),
("捉え直す", "見なおす"),
("着地させる", "しめくくる"),
("再現性のある", "だれがやっても同じになる"),
("淡々と", "きもちを入れずに"),
("議事の要素", "会議のパーツ"),
("必要最小限", "必要なぶんだけ"),
("伝達の精度", "つたわりやすさ"),
("ラベリングする", "名前をつける"),
("本質を突く", "大事なところを突く"),
("妥当性を", "よさ・あっているかを"),
("波及効果", "まわりへの影響"),
("無機質な", "かたいだけの"),
("相対的な位置", "くらべたときの位置"),
("概念を固定", "イメージを固める"),
("持ち札", "いま持っている結果"),
("緊張感を高める", "はりを出す"),
("見通しを共有", "見とおしを共有"),
("生産的な", "はかどる"),
("実り多い", "成果が出る"),
("持続可能な", "長く続けられる"),
("気候変動", "気候の変化"),
("採用する", "えらぶ"),
("言及する際に", "話すときに"),
("言及する", "話す"),
("使用されます", "使われます"),
("使用します", "使います"),
("使用できる", "使える"),
("使用する", "使う"),
("実施する", "行う"),
("把握する", "つかむ"),
("特定する", "はっきり見つける"),
("排除する", "なくす"),
("定着させる", "しっかり身につける"),
("定着する", "身につく"),
("習得できていれば", "わかっていれば"),
("意識しましょう", "気をつけましょう"),
("意識する", "気をつける"),
("観点", "見方"),
("頻繁", "ひんぱん"),
("頻度", "ひんど"),
("期間", "きかん"),
("程度", "ていど"),
("状態", "ようす"),
("状況", "ようす"),
("感情", "きもち"),
("自身の", "自分の"),
("施策", "手だて"),
("施策", "手だて"),
("理解度", "理解の度合い"),
("確認テスト", "確認テスト"),
("音読を省略し", "音読をとばし"),
("即座に", "すぐに"),
("粘らず", "ねばらず"),
("接触回数", "ふれる回数"),
("徹する", "集中する"),
("合格基準", "OKの基準"),
("実戦形式", "本番みたいな形"),
("未知の語彙", "知らないことば"),
("思考の停止", "頭が止まること"),
("読解への土台", "読む力の土台"),
("返り読み", "うしろからもどって読むこと"),
("徹底的に排除", "やめる"),
("チャンクごとに", "かたまりごとに"),
("底上げする", "レベルを上げる"),
("概念化", "かんがえをまとめること"),
("思考の整理術", "考えの整理のやり方"),
("構成力", "組み立てる力"),
("展開力", "話をすすめる力"),
("スタンスを明確に", "自分の立場をはっきり"),
("解像度は十分か", "くわしく言えているか"),
("流暢さ", "なめらかさ"),
("英語的な思考回路", "英語らしい考え方"),
("制約付き", "ルール付き"),
("強制するための装置", "自然に使えるようにするしかけ"),
("遵守し", "守り"),
("編み出す訓練に徹する", "作る練習に集中する"),
("レスポンスが早く", "返事が速く"),
("脳内の知識を瞬時に", "頭の中の知識をすぐに"),
("回路が太くなり", "力がついて"),
("拒絶している", "まだうまくいかない"),
("認知負荷", "頭の負担"),
("予測可能", "予想しやすい"),
("微調整する", "細かく合わせる"),
("追従訓練", "あとからついて発音する練習"),
("最終調整", "さいごの仕上げ"),
("感度が育ちにくく", "感覚が育ちにくく"),
("身体レベルで", "体で"),
("身体に覚えさせる", "体に覚えさせる"),
("暗唱になり", "まる暗記になってしまい"),
("フォームが崩れ", "形がくずれ"),
("効率化", "こう効率"),
("効率的です", "やりやすいです"),
("知覚」し", "聞きとり」し"),

("主語の設計", "主語の組み立て"),
("事実の構造化", "事実の組み立て"),
("情報の削ぎ落とし", "じょうほうをけずる"),
("因果の明確化", "原因と結果をはっきり"),
("解像度の向上", "くわしくする"),
("時間軸の意識", "時間を意識する"),
("視点の切り替え", "視点を変える"),
("最重要の土台", "いちばん大事な土台"),
("避けては通れない", "必ず通る道の"),
("ひけては通れない", "必ず通る道の"),
("高度な", "レベル高めの"),
("深く丁寧に", "ていねいに"),
("深く丁ねいに", "ていねいに"),
("レクチャーできる", "説明できる"),
("読み解く", "読みとく"),
("解き明かす", "わかりやすく説明します"),
("基いしずえ", "基礎"),
("基礎パーツ", "基本パーツ"),
("書きかんえ", "書き換え"),
("機能をフルに活用されたい場合は", "もっと使いこなしたいときは"),
("お申し込みをご実施ください", "お申し込みください"),
("ご利用頂いている", "使っている"),
("ご利用いただいている", "使っている"),
("対象者", "だれ向けか"),
("本質", "大切なところ"),
("抽象的", "ぼんやりした"),
("具体的", "くわしい"),
("明示する", "はっきり示す"),
("提示する", "出す"),
("配置する", "並べる"),
("確定させる", "決める"),
("簡潔に", "短く"),
("普遍的な", "いつもの・ふつうの"),
("構成要素", "部品・パーツ"),
("議事", "会議の話"),
("要因", "原因"),
("収束", "おさまること"),
("発生", "起こること"),
("対応", "たいおう"),
("対処", "たいしょ"),
("影響", "えいきょう"),
("業務", "しごと"),
("職場", "しごとば"),
("密度", "こみぐあい"),
("差分", "ちがい"),
("概念", "考え方・イメージ"),
("根拠", "理由"),
("遅延", "おくれ"),
("期限", "しめきり"),
("数値", "数"),
("固有名詞", "名前（固有名詞）"),
("五感", "見る・聞く・触るなど"),
("比喩", "たとえ"),
("現状", "いまのようす"),
("理解スピード", "理解する速さ"),
("表現の幅", "表現のば"),
("劇的に", "ぐんと"),
("向上させる", "よくする"),
("向上します", "よくなります"),
("身につきます", "身につきます"),
("必須の", "必ずいる"),
("不可欠", "なくてはならない"),
("複雑な内容", "むずかしい内容"),
("中上級者", "中〜上級の人"),
("リンキング", "音のつながり（リンキング）"),
("リダクション", "音の省略（リダクション）"),
("音声知覚の自動化", "音を考えなくても聞きとれるようにすること"),
("意味理解", "意味を理解すること"),
("文章化", "文にすること"),
("概念化", "考えをまとめること"),
("土台作り", "土台づくり"),
("全スキル", "すべてのスキル"),
("他人に説明できるレベル", "友だちに説明できるくらい"),
("頭に叩き込む", "しっかり覚える"),
("脳に叩き込む", "しっかり覚える"),
("忠実な再現", "できるだけ同じようにまねる"),
("視覚的に", "目で見て"),
("問題演習を実施", "問題を解く"),
("確信が持てなかった", "自信がなかった"),
("完璧な状態へ引き上げる", "きちんとわかる状態にする"),
("文脈と意味を完全に把握", "話の流れと意味をしっかりつかむ"),
("不透明なニュアンス", "わかりにくい意味のちがい"),
("意味の壁を取り払う", "意味のわからなさをなくす"),
("口を英語のリズムに適応", "口を英語のリズムに合わせる"),
("意識せずとも", "考えなくても"),
("追い込む", "そこまでもっていく"),
("思考の停止", "頭が止まること"),
("スムーズな読解", "スムーズに読むこと"),
("語順通り", "語順どおり"),
("置き換えず", "入れかえず"),
("捉える", "つかむ"),
("徹底的に排除する", "やめる"),
("情報の塊", "じょうほうのかたまり"),
("フィードバックし", "本文にいかし"),
("理解スピードを底上げ", "理解する速さを上げ"),
("思考の整理術", "考えを整理するやり方"),
("論理的な構成力・展開力", "すじの通った組み立てと話し方"),
("話の構成を練る", "話の組み立てを考える"),
("自分のスタンス", "自分の立場"),
("明確に決める", "はっきり決める"),
("論理の繋がり", "すじのつながり"),
("論理の「ズレ」", "すじのずれ"),
("具体例の解像度", "具体例のくわしい度"),
("精度を高める", "うまくする"),
("初見で挑む", "はじめての題に挑戦する"),
("改善点を明確に", "直すところをはっきり"),
("橋渡し", "つなぎ"),
("思考回路の定着", "考え方の固定"),
("ネイティブにとって自然", "ネイティブが自然に感じる"),
("ロジックを腹に落とす", "理由を納得する"),
("フォームを定着", "型を身につける"),
("禁止事項・挑戦課題", "やってはいけないこと・挑戦すること"),
("装置。", "しかけです。"),
("日本語的な発想を捨て", "日本語っぽいかんがえをやめて"),
("訓練に徹する", "練習に集中する"),
("納得できるまで反復", "納得できるまでくり返し"),
("合格を出す", "OKとする"),
("高速化", "速くすること"),
("瞬時に", "すぐに"),
("回路が太くなり", "力がついて"),
("レスポンス", "返事"),
("フルセンテンス", "全文"),
("即座に英文を確認", "すぐに英文を見る"),
("留まらず", "とどまらず"),
("浅く、速く", "浅く・速く"),
("周回を3サイクル", "まわりを3回"),
("徹底撃破する", "やり切ってなくす"),
("無駄を省き", "むだをなくし"),
("構文・語順", "文の形・語順"),
("ランダム抽出", "ランダムに出る"),
("全神経を集中させる", "しっかり集中する"),
("設計図」を脳内に作る", "設計図」を頭の中に作る"),
("学習時間いっぱい", "勉強の時間いっぱい"),
("認知負荷が下がり", "頭の負担が減り"),
("内容理解に回せるリソースが増え", "内容を考える余裕が増え"),
("予測回路", "予想する力"),
("補強する", "強くする"),
("微調整する工程", "細かく合わせる工程"),
("追従」することで", "あとからついて発音することで"),
("聴覚の予測", "耳の予想"),
("わざと遅延を入れた", "わざとおくらせた"),
("そのまま効きます", "そのまま役立ちます"),
("最終調整として有効", "さいごの仕上げとして役立つ"),
("並行して回せる", "同時に進められる"),
("弱点を潰して", "苦手をつぶして"),
("日常のリスニングへの効き方", "ふだんのリスニングにどう効くか"),
("予測可能」になると", "予想しやすく」なると"),
]

# Protect already-glossed terms from double application by sorting longest first
PHRASES = sorted({a: b for a, b in PHRASES}.items(), key=lambda x: len(x[0]), reverse=True)


# Multi-char word fixes (before char-level soft_kanji)
WORD_FIXES = [
("一緒に", "いっしょに"),
("一緒", "いっしょ"),
("誰が", "だれが"),
("誰に", "だれに"),
("誰の", "だれの"),
("誰を", "だれを"),
("誰か", "だれか"),
("誰", "だれ"),
("綺麗", "きれい"),
("面倒", "めんどう"),
("素敵", "すてき"),
("頑張っ", "がんばっ"),
("頑張る", "がんばる"),
("頑張", "がんば"),
("曖昧", "あいまい"),
("彼＝", "かれ＝"),
("彼女", "かのじょ"),
("彼が", "かれが"),
("彼は", "かれは"),
("彼を", "かれを"),
("彼の", "かれの"),
("彼に", "かれに"),
("猫", "ねこ"),
("頷", "うなず"),
("凄", "すご"),
("咄嗟", "とっさ"),
("繋ぐ", "つなぐ"),
("繋が", "つなが"),
("繋い", "つない"),
]
WORD_FIXES = sorted({a:b for a,b in WORD_FIXES}.items(), key=lambda x: len(x[0]), reverse=True)


TAG_SPLIT = re.compile(r"(<[^>]+>)")
ASCII_RUN = re.compile(r"[A-Za-z0-9_'’\-]+")


_CHAR_HIRA_CACHE = {}

def _char_to_hira(ch: str) -> str:
    if ch in _CHAR_HIRA_CACHE:
        return _CHAR_HIRA_CACHE[ch]
    items = KKS.convert(ch)
    h = (items[0].get("hira") if items else None) or ch
    _CHAR_HIRA_CACHE[ch] = h
    return h


def soft_kanji(text: str) -> str:
    """Disabled: char-level kakasi breaks compound words (微笑む→び笑む).
    Prefer phrase/word maps instead.
    """
    return text


def apply_phrases(text: str) -> str:
    for a, b in PHRASES:
        if a in text:
            text = text.replace(a, b)
    for a, b in WORD_FIXES:
        if a in text:
            text = text.replace(a, b)
    return text


def simplify_plain(text: str) -> str:
    if not isinstance(text, str) or not text:
        return text
    # Keep pure English / phonetics mostly untouched if no JP
    if not any("\u3040" <= c <= "\u30ff" or "\u4e00" <= c <= "\u9fff" for c in text):
        return text
    text = apply_phrases(text)
    text = soft_kanji(text)
    # Light polite → kid-friendly tweaks
    text = text.replace("いたします", "します")
    text = text.replace("ご活用", "ご利用")
    text = text.replace("くださいませ", "ください")
    return text


def simplify_maybe_html(text: str) -> str:
    if not isinstance(text, str) or not text:
        return text
    if "<" not in text:
        return simplify_plain(text)
    parts = TAG_SPLIT.split(text)
    out = []
    for p in parts:
        if p.startswith("<") and p.endswith(">"):
            out.append(p)
        else:
            out.append(simplify_plain(p))
    return "".join(out)


# Fields that should be rewritten in portal-data
FIELD_KEYS = {
    "meaning", "translation", "japanese", "japaneseArticle", "example_ja",
    "question", "explanation", "explanationG", "answer", "option2", "option3", "option4",
    "point", "background", "assignment", "rules", "badge", "sentence",
    "exam_1", "exam_2", "exam_3", "theme", "category", "training_topic",
    "welcomeMessage",
}

# Nested keys in keywords / highlights
NESTED_JA = {"meaning", "explanation", "example_ja", "japanese", "pos"}


def walk(obj, path=""):
    if isinstance(obj, dict):
        for k, v in list(obj.items()):
            if isinstance(v, str) and (k in FIELD_KEYS or k in NESTED_JA):
                obj[k] = simplify_maybe_html(v)
            else:
                walk(v, path + "." + k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk(v, f"{path}[{i}]")


def rewrite_speaking(items):
    assert len(items) == len(SPEAKING_REWRITES), (len(items), len(SPEAKING_REWRITES))
    for item, rw in zip(items, SPEAKING_REWRITES):
        for k, v in rw.items():
            item[k] = v
        # category may still be adult; simplify
        if "category" in item:
            item["category"] = simplify_plain(item["category"])


def rewrite_chunk(items):
    missing = []
    for item in items:
        p = item.get("point") or ""
        if p in CHUNK_POINT_MAP:
            item["point"] = CHUNK_POINT_MAP[p]
        else:
            missing.append(p)
        for k in ("sentence", "exam_1", "exam_2", "exam_3", "theme"):
            if item.get(k):
                item[k] = simplify_plain(item[k])
    return missing


def rewrite_grammar_manual(gm: dict):
    for k, v in list(gm.items()):
        if isinstance(v, str):
            gm[k] = simplify_maybe_html(v)
    # Soften category key display isn't needed (keys are titles)


def process_portal(path: Path):
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    rewrite_speaking(data["speaking"])
    missing = rewrite_chunk(data["chunk"])
    # Other modules via walker (skip speaking/chunk already handled except leftover)
    for key in ("vocabulary", "pronunciation", "grammar", "shadowing", "reading", "topicTalk"):
        walk(data[key])
    # speaking/chunk leftovers already rewritten; still walk category etc softly
    for item in data["speaking"]:
        for k in ("category",):
            if k in item:
                item[k] = simplify_plain(item[k])
    if data.get("grammarManual"):
        rewrite_grammar_manual(data["grammarManual"])
    # welcome
    if data.get("welcomeMessage"):
        data["welcomeMessage"] = simplify_plain(data["welcomeMessage"])
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return missing


def process_json_file(path: Path):
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    walk(data)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def process_js_string_literals_file(path: Path):
    """Best-effort: simplify Japanese inside single-quoted JS string concatenations for guides."""
    text = path.read_text(encoding="utf-8-sig")
    # Only rewrite TRAINING_GUIDES / detail HTML / UI messages via simplify on whole file JP segments outside of English-heavy parts.
    # Safer: run phrase+soft_kanji on the whole file but restore HTML tags and ASCII identifiers carefully via maybe_html on chunks between quotes.

    def repl_string(m):
        q = m.group(1)
        body = m.group(2)
        if not any("\u3040" <= c <= "\u30ff" or "\u4e00" <= c <= "\u9fff" for c in body):
            return m.group(0)
        # Don't touch paths / video labels heavily technical? still OK soft
        new_body = simplify_maybe_html(body)
        # escape back to single-quoted JS: keep as-is (bodies shouldn't contain unescaped ')
        return q + new_body + q

    # Match '....' strings (no escaped quote handling beyond \')
    pattern = re.compile(r"(')((?:\\'|[^'])*)(')")
    new_text, n = pattern.subn(lambda m: m.group(1) + (simplify_maybe_html(m.group(2).encode().decode('unicode_escape') if False else m.group(2))) + m.group(3), text)
    # Manual simpler pass: apply phrases on whole text then soft_kanji only on non-tag runs — too risky for code.
    # Instead: line-based for string concat content
    out_lines = []
    for line in text.splitlines(keepends=True):
        if any("\u3040" <= c <= "\u30ff" or "\u4e00" <= c <= "\u9fff" for c in line) and ("'" in line or '"' in line):
            # replace Japanese inside quotes
            def fix(m):
                quote, body = m.group(1), m.group(2)
                if any("\u3040" <= c <= "\u30ff" or "\u4e00" <= c <= "\u9fff" for c in body):
                    return quote + simplify_maybe_html(body) + quote
                return m.group(0)
            line = re.sub(r"(['\"])(.*?)\1", fix, line)
        out_lines.append(line)
    path.write_text("".join(out_lines), encoding="utf-8")


def main():
    portal = ROOT / "data" / "portal-data.json"
    print("Processing", portal)
    missing = process_portal(portal)
    if missing:
        print("MISSING CHUNK POINTS:", len(set(missing)))
        for p in sorted(set(missing))[:20]:
            print("---", p[:120])
    else:
        print("All chunk points mapped.")

    for rel in [
        "content/data/shadowing-japanese.json",
        "content/data/reading-local-modes.json",
    ]:
        p = ROOT / rel
        if p.exists():
            print("Processing", p)
            process_json_file(p)

    # training-guides / kepty-lite: rewrite manually (phrase+kakasi damages copy quality)

    print("Done.")


if __name__ == "__main__":
    main()
