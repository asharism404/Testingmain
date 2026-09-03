/* ============================================================
   NAVIGATION
   ============================================================ */

function showPage(id,button){

    document.querySelectorAll(".page")
        .forEach(p=>p.classList.remove("active"));

    const page=document.getElementById(id);

    if(page){
        page.classList.add("active");
    }

    document.querySelectorAll(".nav-btn")
        .forEach(b=>b.classList.remove("active"));

    if(button){
        button.classList.add("active");
    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    if(id==="pyq"){
        renderPYQs();
    }

    if(id==="dashboard"){
        renderDashboard();
    }
}


/* ============================================================
   ANSWER BUILDER
   ============================================================ */

function selectAnswerType(el){

    document.querySelectorAll(".option")
        .forEach(x=>x.classList.remove("selected"));

    el.classList.add("selected");

    selectedAnswerType=el.dataset.type;
}


function getSubjectRules(subject){

    const rules={

        "Pathology":[
            "definition",
            "classification",
            "etiology/risk factors",
            "pathogenesis",
            "morphology/gross findings",
            "microscopic findings",
            "clinical features",
            "complications",
            "laboratory diagnosis",
            "important differential tables"
        ],

        "Pharmacology":[
            "definition/classification",
            "prototype drugs",
            "mechanism of action",
            "pharmacological actions",
            "pharmacokinetics where relevant",
            "therapeutic uses with rationale",
            "adverse effects",
            "contraindications",
            "drug interactions",
            "important clinical pearls"
        ],

        "Microbiology":[
            "classification",
            "morphology",
            "culture characteristics",
            "pathogenesis",
            "virulence factors",
            "clinical manifestations",
            "laboratory diagnosis",
            "specimen collection",
            "treatment/prevention where relevant",
            "vaccines/prophylaxis where relevant"
        ],

        "Forensic Medicine & Toxicology":[
            "definition",
            "classification",
            "mechanism/pathophysiology",
            "clinical features",
            "postmortem findings",
            "medicolegal importance",
            "diagnosis/investigation",
            "management/treatment where relevant",
            "important differentiating features",
            "legal terminology where relevant"
        ],

        "Anatomy":[
            "definition / introduction",
            "gross anatomy / features",
            "relations (anterior, posterior, lateral, etc.)",
            "blood supply (arterial & venous drainage)",
            "nerve supply",
            "lymphatic drainage",
            "histology where relevant",
            "embryological development where relevant",
            "applied anatomy / clinical significance",
            "labelled text diagrams/flowcharts"
        ],

        "Physiology":[
            "introduction / definition",
            "functional anatomy / mechanisms",
            "physiological variations / factors affecting",
            "pathways / feedback loops / regulation",
            "applied physiology / clinical correlations",
            "methods of measurement / laboratory tests",
            "summary flowcharts / diagrams"
        ],

        "Biochemistry":[
            "introduction / definition",
            "chemical nature / structure / classification",
            "metabolic pathways / biosynthesis / degradation",
            "energetics and regulation",
            "enzyme involvement / cofactors",
            "biomedical importance / functions",
            "clinical disorders / inborn errors / deficiency states",
            "laboratory tests / LFT/KFT/special techniques"
        ]

    };

    return rules[subject] || [];
}


function buildPrompt(){

    const subject=document.getElementById("answerSubject").value;
    const paper=document.getElementById("answerPaper").value;
    const topic=document.getElementById("topicInput").value.trim();
    const depth=document.getElementById("answerDepth").value;
    const emphasis=document.getElementById("answerEmphasis").value;

    if(!topic){
        toast("Enter a topic or university question first.");
        document.getElementById("topicInput").focus();
        return;
    }


    const rules=getSubjectRules(subject);


    generatedPrompt=`You are an expert Indian MBBS university examination tutor.

ASHARCHIVES — MBBS MUHS ANSWER ENGINE

SUBJECT:
${subject}

PAPER:
${paper}

QUESTION TYPE:
${selectedAnswerType}

TOPIC / QUESTION:
${topic}

ANSWER DEPTH:
${depth}

EXTRA EMPHASIS:
${emphasis}


OBJECTIVE
Generate a high-scoring undergraduate MBBS university examination answer.

The answer must be appropriate for an MBBS student and should prioritize exam relevance over unnecessary postgraduate-level detail.

SUBJECT-SPECIFIC STRUCTURE
${rules.map((x,i)=>(i+1)+". "+x).join("\n")}


UNIVERSITY ANSWER RULES

1. Start with a precise definition whenever applicable.
2. Use clear numbered headings and subheadings.
3. Follow a logical university-answer sequence.
4. Include classifications wherever relevant.
5. Include important mechanisms/pathogenesis rather than vague descriptions.
6. Include clinically important examples.
7. Use tables for comparisons.
8. Use flowcharts where they improve recall.
9. Use text-based labelled diagrams where a diagram is expected.
10. Highlight high-yield facts.
11. Include relevant investigations/laboratory diagnosis.
12. Include treatment/management only when appropriate to the topic.
13. Mention important adverse effects/contraindications for pharmacology questions.
14. Mention medicolegal importance for FMT questions.
15. Do not invent facts, doses, classifications or guidelines.
16. Do not unnecessarily expand into postgraduate-level material.
17. Use terminology appropriate for Indian MBBS university examinations.
18. Do not omit important points simply to make the answer short.
19. Make the answer easy to reproduce in a handwritten university examination.
20. If a fact is uncertain or varies between standard textbooks, state that appropriately rather than fabricating certainty.


FORMAT

# TITLE

## Definition

## Classification
(if applicable)

## Main Answer

Use concise paragraphs, bullet points, tables and flowcharts where appropriate.

## Clinical / Applied Importance
(if relevant)

## High-Yield Points
Give 5–10 points that should not be missed in the examination.

## Viva Questions
Give 5 likely viva questions with concise answers.

## Common Examination Mistakes
Give 3–5 common mistakes students should avoid.

FINAL REQUIREMENT

The answer should feel like a polished 10/10 MBBS university answer, not a generic AI explanation.

Question:
${topic}`;


    document.getElementById("generatedPrompt").value=generatedPrompt;

    document.getElementById("promptPanel").style.display="block";

    document.getElementById("promptPanel")
        .scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    toast("University-level prompt generated.");
}


/* ============================================================
   COPY / GEMINI
   ============================================================ */

async function copyGeneratedPrompt(){

    if(!generatedPrompt){
        buildPrompt();
    }

    if(!generatedPrompt){
        return;
    }

    try{

        await navigator.clipboard.writeText(generatedPrompt);

        toast("Prompt copied to clipboard.");

    }catch(e){

        const box=document.getElementById("generatedPrompt");

        box.focus();
        box.select();

        document.execCommand("copy");

        toast("Prompt copied.");

    }
}


async function openGemini(){

    if(!generatedPrompt){
        buildPrompt();
    }

    if(!generatedPrompt){
        return;
    }

    try{

        await navigator.clipboard.writeText(generatedPrompt);

        window.open(
            "https://gemini.google.com/",
            "_blank"
        );

        toast("Prompt copied. Paste it into Gemini.");

    }catch(e){

        window.open(
            "https://gemini.google.com/",
            "_blank"
        );

        toast("Gemini opened. Copy the prompt manually.");

    }
}


/* ============================================================
   GEMINI API
   ============================================================ */

function saveAPI(){

    const key=document.getElementById("apiKey").value.trim();

    if(!key){
        toast("Enter your Gemini API key.");
        return;
    }

    localStorage.setItem(
        "asharchives_gemini_key",
        key
    );

    const model=document.getElementById("geminiModel").value;

    localStorage.setItem(
        "asharchives_gemini_model",
        model
    );

    updateAPIStatus();

    toast("Gemini API key saved locally.");

}


function clearAPI(){

    localStorage.removeItem("asharchives_gemini_key");

    document.getElementById("apiKey").value="";

    updateAPIStatus();

    toast("API key removed from this browser.");

}


function updateAPIStatus(){

    const key=localStorage.getItem(
        "asharchives_gemini_key"
    );

    const model=localStorage.getItem(
        "asharchives_gemini_model"
    ) || "gemini-3.7-flash";

    const status=document.getElementById("apiStatus");

    if(key){

        document.getElementById("apiKey").value=key;

        document.getElementById("geminiModel").value=model;

        status.className="api-status ready";

        status.innerHTML=
            "✓ API key saved locally • Model: <strong>"+
            model+
            "</strong>";

    }else{

        status.className="api-status warning";

        status.innerHTML=
            "No API key saved. AshArchives will not send requests until you add one.";

    }

}


async function generateWithGemini(){

    if(!generatedPrompt){
        buildPrompt();
    }

    if(!generatedPrompt){
        return;
    }

    const key=localStorage.getItem(
        "asharchives_gemini_key"
    );

    if(!key){

        toast("Add your Gemini API key first.");

        document.getElementById("apiKey")
            .scrollIntoView({
                behavior:"smooth",
                block:"center"
            });

        return;
    }


    const model=
        document.getElementById("geminiModel").value;


    const resultPanel=
        document.getElementById("resultPanel");

    const output=
        document.getElementById("answerOutput");

    const status=
        document.getElementById("generationStatus");


    resultPanel.classList.add("visible");

    resultPanel.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });


    status.innerHTML=
        '<span class="status-dot"></span>Generating...';

    output.innerHTML=
        '<div style="padding:30px;text-align:center;color:#666">\
        AshArchives is generating your university answer...\
        </div>';


    try{

        const response=await fetch(
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "x-goog-api-key":key
                },

                body:JSON.stringify({

                    model:model,

                    input:generatedPrompt,

                    store:false,

                    generation_config:{
                        max_output_tokens:12000
                    }

                })
            }
        );


        const data=await response.json();


        if(!response.ok){

            const errorMessage=
                data?.error?.message ||
                data?.message ||
                "Gemini request failed.";

            throw new Error(errorMessage);

        }


        let text="";


        if(typeof data.output_text==="string"){

            text=data.output_text;

        }else if(Array.isArray(data.steps)){

            for(const step of data.steps){

                if(
                    step.type==="model_output" &&
                    Array.isArray(step.content)
                ){

                    for(const content of step.content){

                        if(
                            content.type==="text" &&
                            typeof content.text==="string"
                        ){

                            text+=content.text;

                        }

                    }

                }

            }

        }


        if(!text){

            throw new Error(
                "Gemini returned no text output."
            );

        }


        lastAnswer=text;

        localStorage.setItem(
            "asharchives_last_answer",
            text
        );


        output.innerHTML=
            markdownToHTML(text);


        status.innerHTML=
            '<span class="status-dot"></span>Generation complete';


        saveHistory(
            document.getElementById("topicInput").value,
            document.getElementById("answerSubject").value,
            text
        );


    }catch(error){

        console.error(error);

        status.innerHTML=
            '<span class="status-dot" style="background:#c92e2e"></span>Generation failed';


        output.innerHTML=
            `<div style="
                border:1px solid rgba(201,46,46,.3);
                background:#fff1f1;
                padding:20px;
                border-radius:12px;
            ">
                <strong style="color:#b42222">
                    Gemini request failed
                </strong>

                <p style="margin-top:10px;color:#555">
                    ${escapeHTML(error.message)}
                </p>

                <p style="margin-top:10px;font-size:12px;color:#777">
                    Check that your API key is valid and that the selected
                    Gemini model is available to your key.
                </p>
            </div>`;

    }

}


/* ============================================================
   PYQ FILTERING
   ============================================================ */

function renderPYQs(){

    const search=
        document.getElementById("pyqSearch").value
            .toLowerCase()
            .trim();

    const subject=
        document.getElementById("pyqSubject").value;

    const paper=
        document.getElementById("pyqPaper").value;

    const tier=
        document.getElementById("pyqTier").value;

    const type=
        document.getElementById("pyqType").value;

    const sort=
        document.getElementById("pyqSort").value;


    let filtered=PYQS.filter(q=>{

        const haystack=(
            q.question+" "+
            q.topic+" "+
            q.section+" "+
            q.subject
        ).toLowerCase();


        return (
            (!search || haystack.includes(search)) &&
            (subject==="All" || q.subject===subject) &&
            (paper==="All" || q.paper===paper) &&
            (tier==="All" || q.tier===tier) &&
            (type==="All" || q.type===type)
        );

    });


    const tierRank={
        "Tier 1":1,
        "Tier 2":2,
        "Tier 3":3,
        "Tier 4":4
    };


    filtered.sort((a,b)=>{

        if(sort==="priority"){
            return (tierRank[a.tier]||5)-(tierRank[b.tier]||5);
        }

        if(sort==="subject"){
            return a.subject.localeCompare(b.subject);
        }

        return a.topic.localeCompare(b.topic);

    });


    document.getElementById("pyqSummary").innerHTML=`

        <div class="filter-chip">
            Showing <strong>${filtered.length}</strong> questions
        </div>

        <div class="filter-chip">
            Tier 1:
            <strong>${filtered.filter(q=>q.tier==="Tier 1").length}</strong>
        </div>

        <div class="filter-chip">
            LAQ:
            <strong>${filtered.filter(q=>q.type==="LAQ").length}</strong>
        </div>

        <div class="filter-chip">
            SAQ/SN:
            <strong>${filtered.filter(q=>q.type==="SAQ/SN").length}</strong>
        </div>

    `;


    const list=document.getElementById("pyqList");


    if(!filtered.length){

        list.innerHTML=`

            <div class="empty">

                <h3>No questions found</h3>

                <p>
                    Try clearing a filter or searching for a broader topic.
                </p>

                <button
                    class="secondary"
                    onclick="clearPYQFilters()">
                    Clear filters
                </button>

            </div>

        `;

        return;

    }


    list.innerHTML=filtered.map(q=>`

        <article class="pyq-card">

            <div class="pyq-top">

                <div class="pyq-meta">

                    <span class="badge ${q.tier==="Tier 1"?"tier1":q.tier==="Tier 2"?"tier2":q.tier==="Tier 3"?"tier3":"tier2"}">
                        ${q.tier}
                    </span>

                    <span class="badge">
                        ${q.subject}
                    </span>

                    <span class="badge">
                        ${q.paper}
                    </span>

                </div>

                <span class="pyq-type">
                    ${q.type}
                </span>

            </div>

            <div class="pyq-question">
                ${escapeHTML(q.question)}
            </div>

            <div class="pyq-topic">
                ${escapeHTML(q.section)} • ${escapeHTML(q.topic)}
            </div>

            <div class="pyq-actions">

                <button
                    class="small-btn dark"
                    onclick="usePYQ(${q.id})">
                    Use for Answer
                </button>

                <button
                    class="small-btn"
                    onclick="copyQuestion(${q.id})">
                    Copy
                </button>

            </div>

        </article>

    `).join("");

}


function clearPYQFilters(){

    document.getElementById("pyqSearch").value="";

    document.getElementById("pyqSubject").value="All";

    document.getElementById("pyqPaper").value="All";

    document.getElementById("pyqTier").value="All";

    document.getElementById("pyqType").value="All";

    renderPYQs();

}


function usePYQ(id){

    const q=PYQS.find(x=>x.id===id);

    if(!q){
        return;
    }

    document.getElementById("answerSubject").value=q.subject;

    document.getElementById("answerPaper").value=q.paper;

    document.getElementById("topicInput").value=q.question;

    selectedAnswerType=q.type;

    document.querySelectorAll(".option")
        .forEach(x=>{

            x.classList.toggle(
                "selected",
                x.dataset.type===q.type
            );

        });


    showPage("home");

    buildPrompt();

    toast("PYQ loaded into Answer Builder.");

}


function copyQuestion(id){

    const q=PYQS.find(x=>x.id===id);

    if(!q){
        return;
    }

    navigator.clipboard.writeText(q.question)
        .then(()=>toast("Question copied."))
        .catch(()=>toast("Copy failed."));

}


/* ============================================================
   PYQ SUBJECT FLOW
   ============================================================ */

function openPYQSubjectModal(){

    document.getElementById("pyqModal")
        .classList.add("open");

}


function closePYQModal(){

    document.getElementById("pyqModal")
        .classList.remove("open");

}


function openSubjectPYQ(subject){

    closePYQModal();

    currentSubject=subject;

    showPage("pyq");

    document.getElementById("pyqSubject").value=subject;

    renderPYQs();

}


/* ============================================================
   RANDOM QUESTION
   ============================================================ */

function randomQuestion(){

    const tier1=PYQS.filter(
        q=>q.tier==="Tier 1"
    );

    const pool=tier1.length ? tier1 : PYQS;

    const q=
        pool[Math.floor(Math.random()*pool.length)];


    usePYQ(q.id);

    toast(
        "Random High-Yield question selected."
    );

}


/* ============================================================
   DASHBOARD
   ============================================================ */

function renderDashboard(){

    const box=
        document.getElementById("subjectDashboard");


    const subjects=Object.keys(ULTRA);


    box.innerHTML=subjects.map(subject=>{

        const total=PYQS.filter(
            q=>q.subject===subject
        ).length;

        const tier1=PYQS.filter(
            q=>
                q.subject===subject &&
                q.tier==="Tier 1"
        ).length;


        return `

            <div class="subject-card"
                 onclick="openSubjectPYQ('${subject.replace(/'/g,"\\'")}')">

                <div class="badge tier1">
                    ${tier1} Tier 1
                </div>

                <h3 style="margin-top:12px">
                    ${subject}
                </h3>

                <p>
                    ${total} indexed questions
                </p>

                <div class="progress">
                    <span style="
                        width:${Math.min(100,(tier1/15)*100)}%
                    "></span>
                </div>

                <p style="margin-top:9px">
                    ${ULTRA[subject].length} ultra-high-yield topics
                </p>

            </div>

        `;

    }).join("");

}


/* ============================================================
   HISTORY
   ============================================================ */

function saveHistory(topic,subject,answer){

    let history=[];

    try{
        history=
            JSON.parse(
                localStorage.getItem(
                    "asharchives_history"
                )
            ) || [];
    }catch(e){
        history=[];
    }


    history.unshift({

        topic,
        subject,
        answer,
        date:new Date().toLocaleString()

    });


    history=history.slice(0,10);


    localStorage.setItem(
        "asharchives_history",
        JSON.stringify(history)
    );

}


function loadHistory(){

    let history=[];

    try{
        history=
            JSON.parse(
                localStorage.getItem(
                    "asharchives_history"
                )
            ) || [];
    }catch(e){}


    if(!history.length){

        toast("No generated answers yet.");

        return;

    }


    const latest=history[0];

    document.getElementById("answerSubject").value=
        latest.subject;

    document.getElementById("topicInput").value=
        latest.topic;

    lastAnswer=latest.answer;

    document.getElementById("resultPanel")
        .classList.add("visible");

    document.getElementById("answerOutput")
        .innerHTML=
        markdownToHTML(latest.answer);

    showPage("home");

    toast("Latest answer restored.");

}


/* ============================================================
   DOWNLOAD / COPY ANSWER
   ============================================================ */

function copyAnswer(){

    if(!lastAnswer){
        toast("No answer available.");
        return;
    }

    navigator.clipboard.writeText(lastAnswer)
        .then(()=>toast("Answer copied."))
        .catch(()=>toast("Copy failed."));

}


function downloadAnswer(){

    if(!lastAnswer){
        toast("No answer available.");
        return;
    }

    const topic=
        document.getElementById("topicInput")
            .value
            .trim()
            .replace(/[^\w\s-]/g,"")
            .replace(/\s+/g,"-")
            .slice(0,70) || "ashArchives-answer";


    const blob=new Blob(
        [lastAnswer],
        {type:"text/plain;charset=utf-8"}
    );


    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download=topic+".txt";

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

    toast("Answer downloaded.");

}


/* ============================================================
   MARKDOWN RENDERER
   ============================================================ */

function markdownToHTML(md){

    let text=escapeHTML(md);


    text=text.replace(
        /^### (.*)$/gm,
        "<h3>$1</h3>"
    );

    text=text.replace(
        /^## (.*)$/gm,
        "<h2>$1</h2>"
    );

    text=text.replace(
        /^# (.*)$/gm,
        "<h1>$1</h1>"
    );


    text=text.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    text=text.replace(
        /^\- (.*)$/gm,
        "<li>$1</li>"
    );


    text=text.replace(
        /(<li>.*<\/li>\n?)+/g,
        match=>"<ul>"+match+"</ul>"
    );


    text=text.replace(
        /\n\n/g,
        "<br><br>"
    );


    return text;

}


/* ============================================================
   UTILITIES
   ============================================================ */

function escapeHTML(str){

    return String(str)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


function toast(message){

    const el=
        document.getElementById("toast");

    el.textContent=message;

    el.classList.add("show");

    clearTimeout(window.__toast);

    window.__toast=setTimeout(
        ()=>{
            el.classList.remove("show");
        },
        2400
    );

}


function focusBuilder(){

    document.getElementById("answerBuilder")
        .scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    setTimeout(
        ()=>{
            document.getElementById("topicInput").focus();
        },
        500
    );

}


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("totalQuestions")
        .textContent=PYQS.length;

    updateAPIStatus();

    renderPYQs();

    renderDashboard();

});


/* close modal when clicking outside */

document.getElementById("pyqModal")
    .addEventListener("click",e=>{

        if(e.target.id==="pyqModal"){
            closePYQModal();
        }

    });
