import re

# Sample BBCode-like content
bbcode_content = """
[HEADING=1][CENTER][SIZE=7]السلام عليكم و رحمة الله و بركاته[/SIZE][/CENTER][/HEADING]
[CENTER][SIZE=6][COLOR=rgb(19, 182, 41)]اليوم سنجرب صنع واجهة برمجة التطبيقات (API) لموقع NOTION[/COLOR][/SIZE][/CENTER]
[QUOTE]
[HEADING=2][CENTER][SIZE=6][COLOR=rgb(0, 118, 255)]ماهو واجهة برجمة التطبيقات أو API :[/COLOR][/SIZE][/CENTER][/HEADING]
[/QUOTE]
[SIZE=5]
إن API ببساطة هو [COLOR=rgb(181, 84, 0)]مجموعة من البرمجيات التى تسمج لتطبيقين مختلفين التواصل والتفاعل مع بعضهم البعض[/COLOR]. عند استخدام API، يمكن للمطورين استخدام وظائف محددة أو الحصول على بيانات محددة من تطبيق آخر أو خدمة ويب دون الحاجة إلى معرفة كامل التفاصيل عن كيفية عمل هذا التطبيق أو الخدمة. وبالتالي، [COLOR=rgb(181, 84, 0)]يمكن للمطورين [URL='https://mostaql.com/freelancers/skill/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D8%AA%D8%B7%D8%A8%D9%8A%D9%82'][B]بناء تطبيقات جديدة[/B][/URL] تعتمد على البيانات أو الخدمات التي توفرها API بدلاً من إعادة بناء كل هذه الوظائف من الصفر (التعريف من موقع </مطور>)[/COLOR][/SIZE]
[JUSTIFY][SIZE=5]
فالـ [COLOR=rgb(199, 54, 89)][B]api [/B][/COLOR]بكل بساطة هو [COLOR=rgb(199, 54, 89)][B]مكان أرسل فيه طلب لبيانات فيرسلها لي إذا كان موجودة  قد تكون ببصيغة json (أكثر شهرة) أو xml أو yaml (أقل شهرة)[/B][/COLOR][/SIZE]
[COLOR=rgb(199, 54, 89)][SIZE=5][/SIZE][/COLOR]
[/JUSTIFY]
[CENTER][ATTACH type="full" alt="1724187180059.webp"]12711[/ATTACH][/CENTER]
[HEADING=2][CENTER][COLOR=rgb(196, 184, 26)]لماذا أريد صنع ِAPI لهذا الموقع ؟[/COLOR][/CENTER][/HEADING]
[HEADING=2][CENTER][COLOR=rgb(204, 204, 204)]- أكتب ملاحظات شخصية يومية[/COLOR][/CENTER][/HEADING]
[HEADING=2][CENTER][COLOR=rgb(204, 204, 204)]- أشفر الملاحظات الشخصية قبل ما أحطها بالموقع[/COLOR][/CENTER][/HEADING]
[HEADING=2][CENTER][COLOR=rgb(199, 54, 89)]المشروع سيكون بلغة typescript مع Next framework[/COLOR][/CENTER][/HEADING]
[CENTER]
[SIZE=5][B][COLOR=rgb(243, 121, 52)]لذلك ستحتاج إلى:[/COLOR][/B]

1. node package manager

2. Operating systems: macOS, Windows (including WSL), or Linux

3. text editor like vsc[/SIZE][/CENTER]
[HEADING=1][CENTER][ATTACH type="full"]13073[/ATTACH][/CENTER][/HEADING]
[HEADING=1][CENTER][COLOR=rgb(255, 3, 3)]بسم الله نبدأ...[/COLOR][/CENTER][/HEADING]
[CENTER][SIZE=5][COLOR=rgb(255, 255, 255)]أول شيء سنحتاجه إنشاء مشروع next-js وده راح يكون باستخدام الأمر التالي : 
[CODE]npx create-next-app@latest[/CODE][/COLOR][/SIZE][/CENTER]
[HEADING=2][CENTER][SIZE=5] ثم سيسألنا أسئلة غريبة كالتالي:[/SIZE][/CENTER][/HEADING]
[CODE]What is your project named? notion-api

Would you like to use TypeScript? No / Yes

Would you like to use ESLint? No / Yes

Would you like to use Tailwind CSS? No / Yes

Would you like your code inside a `src/` directory? No / Yes

Would you like to use App Router? (recommended) No / Yes

Would you like to use Turbopack for `next dev`?  No / Yes

Would you like to customize the import alias (`@/*` by default)? No / Yes[/CODE]
[CENTER]
[SIZE=5]
[B][COLOR=rgb(90, 114, 160)]🔹السؤال الأول[/COLOR][/B]: عن ماذا ستسمي مشروعك.

[B][COLOR=rgb(90, 114, 160)]🔹السؤال الثاني:[/COLOR][/B] هل ستسخدم typescript و نعم سنستخدمه وسنشرح فرق بينه و بين javascript 

[B][COLOR=rgb(90, 114, 160)]🔹السؤال الثالث[/COLOR][/B]: هل ستسخدم eslint و هي اضافة بتحدد أخطاء و التحذيرات في مشروعك و سنتكلم عليها بإذن الله

[B][COLOR=rgb(90, 114, 160)]🔹السؤال الرابع[/COLOR][/B]: هل ستسخدم tailwind و هو framework csss و نعم سنستخدمه في هذا المشروع و سنشرح بعض تفاصيله

[B][COLOR=rgb(90, 114, 160)]🔹 السؤال الخامس[/COLOR][/B]: هل تريد أن يكون المشروع أو أكواد المشروع داخل ملف src لا و ماعندي سبب

[B][COLOR=rgb(90, 114, 160)]🔹السؤال السادس[/COLOR][/B]: هل ستسخدم إضافة App Router  نعم وسنشرح بعض تفاصيلها إن شاء الله

[B][COLOR=rgb(90, 114, 160)]🔹السؤال السابع[/COLOR][/B]: هل ستسخدم إضافة turbopack هذه إضافة هي bundler جديد صمم ليكون بديلًا عن webpack في هذا المشروع بنستخدم webpack 

[B][COLOR=rgb(243, 121, 52)]لذلك [/COLOR][/B][/SIZE][COLOR=rgb(243, 121, 52)][SIZE=5][B]سأجيب بـ لا[/B][/SIZE][/COLOR]

[SIZE=5][B][COLOR=rgb(19, 182, 41)]ال bundler هو أداة التي تترجم ملفات المشروع و  أكواد ال css ,js الخ إلى موقع أو تطبيق[/COLOR][/B][/SIZE][COLOR=rgb(19, 182, 41)][SIZE=5][B] , و أشهرهم كما قلنا هو ال webpack 
[/B][/SIZE][/COLOR]
[ATTACH type="full" width="918px" alt="1724278812162.webp"]12742[/ATTACH]

[SIZE=5]
الثامن سيكون غريبًا لو ترجمته لذلك سنتطرق إليه في وسط الشرح بإذن الله[/SIZE]
[COLOR=rgb(199, 54, 89)][SIZE=5][B]في الأخير سيكون لدينا ملف اسمه notion-api و ستكون داخله ملفات المشروع.[/B][/SIZE][/COLOR]
[SIZE=5][/SIZE]

[ATTACH type="full" alt="1724279083586.webp"]12743[/ATTACH]




[SIZE=5]ثاني شيء سيكون [COLOR=rgb(44, 130, 201)]رحلة البحث عن notion api [/COLOR]سيكون لموقع notion api's و نحن سننستخدمهم

[B][U]هذا هو الموقع[/U][/B]: [SIZE=5][URL='https://developers.notion.com']devs.notion[/URL][/SIZE]
[/SIZE]

[ATTACH type="full" width="845px" alt="1724279380089.webp"]12744[/ATTACH]

[SIZE=5]هذا سيكون صديقنا طوال المشروع[/SIZE]
[COLOR=rgb(243, 121, 52)][SIZE=5][B]أول شيء يطلب منا هو internal integration[/B][/SIZE][/COLOR]
[SIZE=5][/SIZE]
[COLOR=rgb(243, 121, 52)][SIZE=5][B]internal integration هو الذي سيتيح لنا التواصل مع صفاحتنا بالموقع فلإتمام هذه العملية سنطلب توكن من الموقع و سيتيح لنا من خلاله التواصل مع الموقع.[/B][/SIZE][/COLOR]

[SIZE=5]سندخل لهذه الصفحة: [SIZE=5][URL='https://www.notion.so/profile/integrations']notion.integration[/URL][/SIZE][/SIZE]

[COLOR=rgb(19, 182, 41)][SIZE=5][B]تم سنضغط new intgration[/B][/SIZE][/COLOR]
[SIZE=5][/SIZE]

[ATTACH type="full" width="936px" alt="1724280083460.webp"]12745[/ATTACH]


[ATTACH type="full" width="954px" alt="1724280374603.webp"]12746[/ATTACH]
[SIZE=5]
[B][COLOR=rgb(199, 54, 89)]📍internal integration[/COLOR][/B] : مصممة لأشخاص المسؤول  هو الذي يحددهم أي أنها مثالية عندما تكون مع فريق أو وحدك
[B][COLOR=rgb(199, 54, 89)]📍external integration[/COLOR][/B] :مصممة لجمهور أوسع  و أي شخص لديه حساب في notion يستطيع الإنضمام

[B][COLOR=rgb(44, 130, 201)]ندخل لـ manage settings [/COLOR][/B]
[/SIZE]
[ATTACH type="full" width="957px" alt="1724280533759.webp"]12747[/ATTACH]


[SIZE=5]نقوم بالرجوع للمشروع ننشئ ملف نسميه[COLOR=rgb(243, 121, 52)][B] .env[/B][/COLOR], [COLOR=rgb(243, 121, 52)][B]ونكتب فيه اسم env var و نقوم بلصق توكن ال intgration [/B][/COLOR][/SIZE]


[ATTACH type="full" width="935px" alt="1724280724213.webp"]12748[/ATTACH]

[SIZE=5]ندخل على موقع notion تم على صفحة التي نريد صنع الواجهة لها تم كما هو موضح في الصورة:[/SIZE]


[ATTACH type="full" width="941px" alt="1724415878225.webp"]12828[/ATTACH]

[SIZE=5][B][COLOR=rgb(19, 182, 41)]هذا سيتيح لأي شخص لديه التوكن حق integration أن يعدل على الصفحة[/COLOR][/B]

سندخل على وثائق الموقع بذات في [COLOR=rgb(199, 54, 89)][B]retrieve a database:   [/B][/COLOR]
[URL='https://developers.notion.com/reference/retrieve-a-database']retrieve.database.notion[/URL][/SIZE]

[ATTACH type="full" width="929px" alt="1724702898249.webp"]13069[/ATTACH]

[SIZE=5]نقوم بالرجوع على مشروعنا ونكتب الأمر التالي:
[CODE]npm run dev[/CODE][/SIZE]


[ATTACH type="full" width="987px" alt="1724336772961.webp"]12791[/ATTACH]


[SIZE=5]بيظهر لنا أن المشروع بدأ في الينك الآتي على [COLOR=rgb(255, 3, 3)][B]المنفذ 3000 [/B][/COLOR]نقوم بدخول إليه:[/SIZE]


[ATTACH type="full" width="902px" alt="1724336849589.webp"]12792[/ATTACH]

[SIZE=5]تظهر لنا هذه الواجهة يمكنك إلقاء النظرة عليها [COLOR=rgb(19, 182, 41)]لأنها تحتوي على روابط قد تكون مفيدة لمن يريد تعلم هذا الإطار[/COLOR]

نرجع لمحرر الأكواد ونقوم بالدخول على مجلد app تم ملف page.tsx و نقوم بمسح كل شيء: 


[B][COLOR=rgb(44, 130, 201)]أول شيء نكتبه:[/COLOR][/B][/SIZE]

[ATTACH type="full" width="883px" alt="1724338303070.webp"]12798[/ATTACH]


[SIZE=5][B]نعيد فتح المتصفح على المنفذ 3000 فسنرى أن:[/B][/SIZE]


[ATTACH type="full" width="909px" alt="1724338366592.webp"]12800[/ATTACH]

[SIZE=5]داخل مجلد app [COLOR=rgb(203, 34, 215)]نفتح مجلد نسميه lib ننشئ ملف نسميه action.ts[/COLOR], و نقوم بلصق الكود الذي أخدنه من وثائق موقع notion[/SIZE]

[ATTACH type="full" width="937px" alt="1724338525754.webp"]12802[/ATTACH]
[SIZE=5]
نرجع لملف .env, [COLOR=rgb(243, 121, 52)][B]ننشئ env var نسميه databaseID و نعطيه قيمة معرف الصفحة التي نسخها من رابط الموقع.[/B][/COLOR][/SIZE]


[ATTACH type="full" width="917px" alt="1724338753248.webp"]12803[/ATTACH]


[COLOR=rgb(255, 3, 3)][SIZE=6][B]تم بنجاح...[/B][/SIZE][/COLOR]


[ATTACH type="full" width="901px" alt="1724338897634.webp"]12804[/ATTACH]
[SIZE=5]
نرجع لملف [COLOR=rgb(44, 130, 201)][B]app/lib/actions.ts[/B][/COLOR],  نقوم بتغيرات بسيطة كما هي موضحة بالصور:[/SIZE]


[ATTACH type="full" width="936px" alt="1724339169700.webp"]12805[/ATTACH]

[ATTACH type="full" width="940px" alt="1724703676219.webp"]13071[/ATTACH]

[SIZE=5]نشرح المصطلحات التي تم تستطيرها بالأصفر:[/SIZE]
[SIZE=7][B][ICODE][COLOR=rgb(247, 218, 100)]require('@notionhq/client');[/COLOR][/ICODE][/B][/SIZE]
[SIZE=5]
هذا يعني أنه سنحتاج إلى مكتبة اسمها [COLOR=rgb(19, 182, 41)][B]@notionhq/client[/B][/COLOR] لذلك سنقوم بتنزيلها باستعمال الأمر التالي:
[CODE]npm install @notionhq/client[/CODE]

[B][COLOR=rgb(226, 80, 65)]📍function async [/COLOR][/B]:هي دوال التي تقدم نتائجها بشكل غير متزامن أي أنها لا تعتمد على دالة أخرى فيمكن للبرنامج تشغيلها و تشغيل أي شي آخر  بنفس الوقت

[B][COLOR=rgb(226, 80, 65)]📍await keyword [/COLOR][/B]:يجعل الدالة تتوقف حتى تأخد نتيجة تم تستمر

[B][COLOR=rgb(226, 80, 65)]📍console.log[/COLOR][/B]: هي الدالة التي تقوم بطباعة الأشياء مثل Print في python أو printf في c أو C++ أو ECHO في php ومررنا لها الثابث response الذي سرطرنا تحته بالأزرق

و  الآن ننشئ مجلد نسميه [B][COLOR=rgb(255, 3, 3)]database [/COLOR][/B](يمكنك تغير الاسم) داخله ننشئ ملف نسميه page.tsx [COLOR=rgb(255, 3, 3)][B]و في هذه الحالة لا يجب تغير اسم page.tsx لأنه سيصبح غير قابل للتوجيه أو زيارة و هذه من قواعد إطار Next-js[/B][/COLOR]

داخل ملف: [SIZE=5]app/database/page.tsx[/SIZE]

نقوم بإنشاء عنصر نسميه أي اسم أنا أسميته Notion و نقوم بإستدعاء الدالة [COLOR=rgb(19, 182, 41)][B]RetriveDatabase [/B][/COLOR]في الملف[/SIZE]

[ATTACH type="full" width="978px" alt="1724418075330.webp"]12830[/ATTACH]

[SIZE=5]ماذا تعني @ التي قمنا بإحاظتها بمربع أحمر  ترمز للمجلد الرئيسي في المشروع و هذا يرجعنا للسؤال الثامن حيث ان سؤال كان ماذا تريد أن يكون ترميز المجلد الرئيسي ونحن قررنا أن يكون بإعدادت الإفتراضية لهاذا الهيكل و هو @

نفتح المتصفح على localhost:3000/database
تم نأخد نظرة على موجه الأوامر في محرر الكود الخاص بنا فنجد[/SIZE][/CENTER]

[ATTACH type="full" alt="1724703117422.webp"]13070[/ATTACH]

لو تقوم بتدقيق في هذه البيانات ستجد أنها معلومات على databasenotion
[ATTACH type="full" alt="1724439301765.webp"]12839[/ATTACH]

[ATTACH type="full" alt="1724432212660.webp"]12835[/ATTACH]
داخلها نجد properties و هي خواص ال database  أو يمكنك تسميتها أعمدة ال database
كل خاصية لها إسم و لها id لذلك سننسخ الid و نضعها قي ملف .env
[ATTACH type="full" alt="1724439887865.webp"]12844[/ATTACH]و الأن بنجرب نشئ صفحة داخل ال database
في @/app/lib/actions.ts
نكتب



[ATTACH type="full" alt="1724439351489.webp"]12841[/ATTACH]





[ATTACH type="full" alt="1724439335677.webp"]12840[/ATTACH]


[ATTACH type="full" alt="1724453739878.webp"]12881[/ATTACH]



طبعا ستتسألون من أين أتيت بالكود هذا
طبعا بمساعدة notion api doucemnets

 مثل ما قلت لكم سيكون صديقكم طوال رحلة برمجة هذا المشروع

  تجدونه في هذا المثال كيف يجب أن يكون الكود
[URL='https://developers.notion.com/reference/post-page']create.page.notion[/URL]

  هذا مثال عن كيف يجب أن تكون الخصائص مكتوبة لنوع العنوان (title)
[CODE=json]{
  "properties": {
    "Title": {
      "id": "title",
      "type": "title",
      "title": [
        {
          "type": "text",
          "text": {
            "content": "A better title for the page",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "This is also not done",
          "href": null
        }
      ]
    }
  }
}[/CODE]

نقوم بمنادة CreateApage function من داخل العنصر الذي أنشأنه داخل مجلد ال database

[ATTACH type="full" alt="1724440295831.webp"]12847[/ATTACH]


ندخل من المتصفح على الرابط localhost:3000/database

و نرجع لموقع notion و surprise


[ATTACH type="full" alt="1724440528232.webp"]12849[/ATTACH]





لنقم بتمرير ال tags
مثال عن ال كيفية تمرير ال tags


[ATTACH type="full" alt="1724453898895.webp"]12882[/ATTACH]



لكن سنقوم بتغيير من شكله ليصبح بإستطاعتنا غدخال ال tags كا مدخل للدالة

بتفكير منطقي يجب علينا إدخال مصفوفة تحتوي على ال tags
تم نقوم ب دوران حول هذه المصفوفة لإرسال هذه tags
كما هو موضح بصورة


[ATTACH type="full" alt="1724455510097.webp"]12888[/ATTACH]


map loop
ماهو الفرق بينها و بين for loop

map loop  :
تستخدم في غالب الأححيان لتعديل مصفوفة وإرجاع مصفوفة جديدة تحتوي القيم الجديدة

مثلا محاولة تحويل مصفوفة تحتوي على أرقام إلى مصفوفة تحتوي على مربع تلك الأرقام

[CODE=javascript]
const numbers:number[] = [1,2,3,4,5,6]

const sqnumbers = numbers.map((number:number ): number=>number*number)
[/CODE]


لكن FOR LOOP
لها إستخدمات كثيرة و إستخدامها يكون يدويا أكثر مقارنة ب MAP LOOP


المهم نرجع إلى ملف PAGE.TSX في مجلد ال DATABASE

و نقوم بتعديل على منادة الدالة حيث ستأخد ك مدخل ثاني مصفوفة من ال TAGS

[ATTACH type="full" alt="1724456290693.webp"]12889[/ATTACH]

نقوم بزيارة المتصفح على اللينك localhost:3000/database

فنجد أن




[ATTACH type="full" alt="1724456404917.webp"]12890[/ATTACH]



بقى فقط ال child blocks


طريقة إضافتها



[ATTACH type="full" alt="1724527107504.webp"]12917[/ATTACH]

طبعا شكل البيانات أخدته من notion api
من خلال الرابط
[URL='http://developers.notion.com/reference/block']notion.api.blocks[/URL]

مثال عن العناوين من موقع

[CODE=json]{
  //...other keys excluded
  "type": "heading_1",
  //...other keys excluded
  "heading_1": {
    "rich_text": [{
      "type": "text",
      "text": {
        "content": "Lacinato kale",
        "link": null
      }
    }],
    "color": "default",
    "is_toggleable": false
  }
}[/CODE]




مثال عن الفقرات

[CODE=json]{
  //...other keys excluded
  "type": "paragraph",
  //...other keys excluded
  "paragraph": {
    "rich_text": [{
      "type": "text",
      "text": {
        "content": "Lacinato kale",
        "link": null
      }
    }],
    "color": "default"
}[/CODE]



الأن قم بإكمال الكود بحيث يكون
عنةان رئيسي لون غلافة احمر محتواه negative things
فقرة بلون الأحمر محتواه سيكون مخزن داخل متغير إسمه things.negative_things
عنوان الرئيسي لونه أزرق محتواه other
فقرة بلون default بيكون مخزن داخل متغير things.other


things بيكون مدخل الدالة الثالث لذلك ستحتاج تغيير توقيع الدالة

لذلك سيكون بشكل الأتي


[CODE=javascript]export async function CreateApage({ title, tags ,things}: { title: string, tags:string[] ,things:child_block_data_type}) { ....}[/CODE]

أو


[CODE=javascript]export async function CreateApage({ title, tags ,things}: { title: string, tags:string[] ,things:{
        negative_things: string|null,
        positive_things: string|null,
        other:string|null
    }}) { ...}[/CODE]



أما عن البيانات فأصل أن تكون  بشكل الأتي


[CODE=json]{
        "type": "heading_1",
        "heading_1": {
          "rich_text": [{
            "type": "text",
            "text": {
              "content": "positive things",
              "link": null
            }
          }],
          "color"  :  "green_background"  as color,
          "is_toggleable": false
        }
      },
      {
 
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text:[
            {
            "type": "text",
            "text": {
              "content": things.positive_things,
              "link": null
            },
            "annotations": {
              "color":"green"
            },
            }] as rich_text_type
        }
      },
      {
        "type": "heading_1",
        "heading_1": {
          "rich_text": [{
            "type": "text",
            "text": {
              "content":"negative things",
              "link": null
            }
          }],
          "color": "red_background" as color,
          "is_toggleable": false
        }
      },
      {
 
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text:[
            {
            "type": "text",
            "text": {
              "content": things.negative_things,
              "link": null
            },
            "annotations": {
              "color":"red"

            },
  
  
            }] as rich_text_type
        }
      },{
        "type": "heading_1",
        "heading_1": {
          "rich_text": [{
            "type": "text",
            "text": {
              "content": "other",
              "link": null
            }
          }],
          "color": "blue" as color,
          "is_toggleable": false
        }
      },
      {
 
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text:[
            {
            "type": "text",
            "text": {
              "content": things.other,
              "link": null
            },
            "annotations": {
              "color": "default"
            },
  
  
            }] as rich_text_type
        }
      }[/CODE]



نقوم بمناداة الدالة من الملف

page.tsx داخل مجلد database


[CODE=javascript] CreateApage({ title: "just a test", tags: ["some ", "random ", "words"], things: { positive_things: "just a test ", negative_things: "just a another test ", other: "just to make sure verthing works fine"} })[/CODE]

ندحل من متصفح على ال localhost:3000/database

تم نزور موقع notion فنجد



[ATTACH type="full" alt="1724528367086.webp"]12920[/ATTACH]


و الأن بقي إستخراج الصفحات



[ATTACH type="full" alt="1724624930440.webp"]13052[/ATTACH]


طبعا سنستخدم ال sort لترتيب البيانات بناء على شئ

[ATTACH type="full" alt="1724625258918.webp"]13053[/ATTACH]

فنتيجة ستكون بشكل الأتي



[ATTACH type="full" alt="1724625527332.webp"]13055[/ATTACH]


النتيجة

[ATTACH type="full" alt="1724625874550.webp"]13058[/ATTACH]طبعا توجد العديد من المعلومات التي لن نحتاجها في مشورعنا لذلك سنقوم بتبسيط البيانات
نلاحظ أن بينات عبارة عن structure
لدخول لمعلومات نحتاج نكتب إسم ال structure ثم نقطة تم إسم المعلومة

مثال لدينا structure إسمها student نريد الحصول على معلمة الإسم name فنكتب student.name

للشرح كتبت المثال الأتي
[CODE=javascript]export function student() {
  const student = {
    name:"mohamed",
    firstname: "sumbel",
    job: "cat",
    workplace:"memes",
  }
  console.log(student.name)
  console.log(student.firstname)
  console.log(student.job)
  console.log(student.workplace)

}[/CODE]


طبعا التنيجة ستكون
[CODE=bash]mohamed
sumbel
cat
memes[/CODE]




[ATTACH type="full" alt="1724675155656.webp"]13064[/ATTACH]


بإستخدام هذا المعلموات يمكننا الأن أخد البينات التي نحتاجها

فالشئ الذي سنقوم به الأن أخد مصفوفة res.results
وإرجاع مصفوفة أخرى تحتوي على البيانت المهمة و التي ستكون تاريخ إناشاء تاريخ التعديل إسم الصفحة و tags الصفحة و معرف الصفحة بالتأكيد



[ATTACH type="full" alt="1724676913800.webp"]13065[/ATTACH]



,و هذه هي دالة ال GetTags




[CODE=javascript]function GetTags(result:any) {
  const Tags = result.properties.Tags.multi_select.map((tag: any) => {
    return {
      id: tag.id, name: tag.name
    }
  })
  return Tags;
}[/CODE]


[CENTER][COLOR=rgb(255, 3, 3)]طبعا إلى هنا إنتهى الجزء الأول من المشروع بقي جزء ال ui و تعديل هذه الدوال قليلا و إذافة دوال أخرى[/COLOR]


[COLOR=rgb(247, 218, 100)][SIZE=6]لكن بقي بعض أشياء التي لم نتطرق إليها مثل tailwind css فرق بين typescript و javascript و أيضا موضوع approuter و مواضيع أخرى[/SIZE][/COLOR]
[SIZE=5][COLOR=rgb(0, 118, 255)],و هذه أشياء سنتطرق إليها في الجزء الثاني إن شاء الله[/COLOR][/SIZE]

[COLOR=rgb(0, 168, 133)][SIZE=6]أي خطأ في مقالة يرجى التبليغ عنه لإصلاحه[/SIZE][/COLOR]




[SIZE=5][COLOR=rgb(0, 118, 255)]و السلام عليكم[/COLOR][/SIZE][/CENTER]
"""

# Conversion rules from BBCode to HTML
conversion_rules = [
    (r"\[HEADING=1\](.*?)\[\/HEADING\]", r"<h1>\1</h1>"),
    (r"\[HEADING=2\](.*?)\[\/HEADING\]", r"<h2>\1</h2>"),
    (r"\[CENTER\](.*?)\[\/CENTER\]", r"<div style='text-align: center;'>\1</div>"),
    # Adjust font sizes to be more reasonable
    (r"\[SIZE=7\](.*?)\[\/SIZE\]", r"<span style='font-size: 2.5em;'>\1</span>"),
    (r"\[SIZE=6\](.*?)\[\/SIZE\]", r"<span style='font-size: 2em;'>\1</span>"),
    (r"\[SIZE=5\](.*?)\[\/SIZE\]", r"<span style='font-size: 1.5em;'>\1</span>"),
    (r"\[SIZE=4\](.*?)\[\/SIZE\]", r"<span style='font-size: 1.2em;'>\1</span>"),
    (r"\[SIZE=3\](.*?)\[\/SIZE\]", r"<span style='font-size: 1em;'>\1</span>"),
    (r"\[SIZE=2\](.*?)\[\/SIZE\]", r"<span style='font-size: 0.85em;'>\1</span>"),
    (r"\[SIZE=1\](.*?)\[\/SIZE\]", r"<span style='font-size: 0.75em;'>\1</span>"),
    (r"\[COLOR=rgb\((\d+), (\d+), (\d+)\)\](.*?)\[\/COLOR\]", r"<span style='color: rgb(\1, \2, \3);'>\4</span>"),
    (r"\[QUOTE\](.*?)\[\/QUOTE\]", r"<blockquote>\1</blockquote>"),
    (r"\[B\](.*?)\[\/B\]", r"<b>\1</b>"),
    (r"\[I\](.*?)\[\/I\]", r"<i>\1</i>"),
    (r"\[U\](.*?)\[\/U\]", r"<u>\1</u>"),
    (r"\[CODE=(.*?)\](.*?)\[\/CODE\]", r"<code>\2</code>"),
    (r"\[URL='(.*?)'\](.*?)\[\/URL\]", r"<a href='\1'>\2</a>"),
    (r"\[IMG\](.*?)\[\/IMG\]", r"<img src='\1' alt='' />"),
    (r"\[ATTACH.*?alt=\"(.*?)\"\](.*?)\[\/ATTACH\]", r"<img src='\2' alt='\1' />"),
    (r"\[JUSTIFY\](.*?)\[\/JUSTIFY\]", r"<div style='text-align: justify;'>\1</div>"),
    (r"\[ICODE\](.*?)\[\/ICODE\]", r"<code style='display:inline;'>\1</code>"),
    (r"\[LIST\](.*?)\[\/LIST\]", r"<ul>\1</ul>"),
    (r"\[ITEM\](.*?)\[\/ITEM\]", r"<li>\1</li>")
]

# Function to replace BBCode with HTML, handle new lines, and apply RTL direction
def bbcode_to_html(content):
    for pattern, replacement in conversion_rules:
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Replace new lines with <br> tags
    content = re.sub(r'(\n\s*)', '<br>', content)
    
    # Wrap the entire content in a div with RTL direction
    content = f"<div dir='rtl'>\n{content}\n</div>"
    return content

# Convert the BBCode content to HTML
html_content = bbcode_to_html(bbcode_content)

# Write the HTML content to a file
with open("output.html", "w", encoding="utf-8") as file:
    file.write(html_content)

print("HTML content has been written to 'output.html'.")
