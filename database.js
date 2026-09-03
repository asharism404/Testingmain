/* ============================================================
   ASHARCHIVES DATABASE (INCLUDING BHALANI 3.0 DATASET)
   ============================================================ */

const PYQS = [];

function addQ(subject,paper,section,topic,tier,type,question){
    PYQS.push({
        id:PYQS.length+1,
        subject,
        paper,
        section,
        topic,
        tier,
        type,
        question
    });
}

// Helper for Bhalani import conversion based on stars
function addBhalani(subject, section, topic, freqText, question=""){
    let tier = "Tier 4";
    if (freqText.includes("****") || freqText.includes("***")) tier = "Tier 1";
    else if (freqText.includes("**")) tier = "Tier 2";
    else if (freqText.includes("*")) tier = "Tier 3";

    let qText = question ? question : topic;
    addQ(subject, "Paper I", section, topic, tier, "SAQ/SN", qText);
}

function addClassifiedBhalani(subject, paper, section, topic, freqText, type, question=""){
    let tier = "Tier 4";
    if (freqText.includes("****") || freqText.includes("***")) tier = "Tier 1";
    else if (freqText.includes("**")) tier = "Tier 2";
    else if (freqText.includes("*")) tier = "Tier 3";
    let qText = question ? question : topic;
    addQ(subject, paper, section, topic, tier, type, qText);
}

// ------------------------------------------------------------
// IMPORTING BHALANI 3.0 ANATOMY
// ------------------------------------------------------------
const anatData = [
    ["Head Neck Face", "Scalp Layers, Blood Supply, nerve supply", "****"],
    ["Head Neck Face", "Bell’s palsy", "*"],
    ["Head Neck Face", "Dangerous area of face", "*"],
    ["Head Neck Face", "Orbicularis oculi & its antagonist", "Unmarked"],
    ["Head Neck Face", "Lacrimal Apparatus", "Unmarked"],
    ["Head Neck Face", "Venous drainage of face", "Unmarked"],
    ["Side of Neck", "Deep cervical fascia", "**"],
    ["Side of Neck", "Posterior Triangle of neck", "Unmarked"],
    ["Side of Neck", "Sternocleidomastoid", "Unmarked"],
    ["Anterior Triangles of Neck", "Carotid Triangle & Carotid sheath", "***"],
    ["Anterior Triangles of Neck", "Digastric triangle", "**"],
    ["Anterior Triangles of Neck", "Branches of External carotid artery", "*"],
    ["Anterior Triangles of Neck", "Anastomosis between internal & external carotid", "*"],
    ["Anterior Triangles of Neck", "Ansa cervicalis", "*"],
    ["Back of the neck", "Suboccipital triangle", "Unmarked"],
    ["Parotid Gland", "Parotid Gland", "****"],
    ["Temporal & Infratemporal region", "Temporomandibular joint", "***"],
    ["Temporal & Infratemporal region", "Muscles of mastication", "*"],
    ["Temporal & Infratemporal region", "Otic ganglion", "*"],
    ["Temporal & Infratemporal region", "Pterygoid muscles", "*"],
    ["Submandibular region", "Submandibular salivary gland Applied", "*"],
    ["Structures in the neck", "Thyroid Gland", "***"],
    ["Structures in the neck", "Hypoglossal nerve", "*"],
    ["Structures in the neck", "Cervical lymph nodes", "*"],
    ["Structures in the neck", "Right & Left Subclavian artery", "**"],
    ["Cranial Cavity", "Cavernous sinus", "***"],
    ["Cranial Cavity", "Straight sinus", "*"],
    ["Contents of the orbit", "Extra-ocular muscles", "***"],
    ["Contents of the orbit", "Oculomotor nerve", "**"],
    ["Nose, Paranasal Sinuses", "Nasal septum", "***"],
    ["Nose, Paranasal Sinuses", "Lateral wall of nose", "***"],
    ["Larynx", "Muscles of larynx & actions", "*"],
    ["Larynx", "Movements of Vocal cords", "**"],
    ["Tongue", "Tongue muscles, nerve supply, development, histology", "**"],
    ["Ear", "Middle ear boundaries, contents, applied", "**"],
    ["Eyeball", "Layers of retina", "*"],
    ["Spinal Cord", "T.S at cervical level", "*"],
    ["Spinal Cord", "Brown sequard syndrome", "*"],
    ["Cranial Nerves", "Mesencephalic nucleus of Trigeminal N.", "**"],
    ["Cranial Nerves", "Glossopharyngeal Nerve", "*"],
    ["Cranial Nerves", "Facial Nerve", "**"],
    ["Brainstem", "T.S of Medulla Pyramidal decussation", "***"],
    ["Brainstem", "T.S of Medulla Sensory decussation", "*"],
    ["Brainstem", "T.S of Medulla mid olivary nucleus", "*"],
    ["Brainstem", "Facial colliculus", "*"],
    ["Brainstem", "Medial medullary syndrome", "**"],
    ["Brainstem", "T.S of Pons - facial colliculus level", "**"],
    ["Cerebellum", "Inferior cerebellar peduncle", "***"],
    ["Cerebellum", "Cerebellum histology", "**"],
    ["Fourth ventricle", "Fourth ventricle floor", "**"],
    ["Cerebrum, Diencephalon", "Corpus callosum", "***"],
    ["Cerebrum, Diencephalon", "Superolateral surface of cerebrum", "***"],
    ["Cerebrum, Diencephalon", "Internal capsule", "**"],
    ["Visual & Auditory", "Circle of Willis", "***"],
    ["Pectoral region", "Clavipectoral fascia", "**"],
    ["Pectoral region", "Mammary gland", "****"],
    ["Pectoral region", "Serratus anterior", "*"],
    ["Scapular region", "Quandrangular space", "*"],
    ["Scapular region", "Deltoid muscle", "*"],
    ["Scapular region", "Rotator cuff of shoulder joint", "**"],
    ["Forearm & Hand", "Carpal tunnel syndrome", "**"],
    ["Forearm & Hand", "Ulnar Nerve", "*"],
    ["Forearm & Hand", "Claw hand", "*"],
    ["Forearm & Hand", "Anatomical snuff box", "*"],
    ["Arm", "Cubital fossa", "***"],
    ["Arm", "Biceps brachii", "*"],
    ["Arm", "Radial Nerve", "**"],
    ["Arm", "Musculocutaneous Nerve", "*"],
    ["Arm", "Wrist drop", "**"],
    ["Arm", "Median Nerve", "*"],
    ["Walls of thorax", "Diaphragm - openings", "**"],
    ["Walls of thorax", "Azygous vein", "**"],
    ["Walls of thorax", "Typical intercostal nerve", "*"],
    ["The lungs", "Bronchopulmonary segments", "***"],
    ["The lungs", "Root of Right & Left lung", "*"],
    ["Mediastinum", "Define mediastinum, classify", "*"],
    ["Mediastinum", "Posterior & anterior mediastinum", "*"],
    ["Mediastinum", "Superior mediastinum", "*"],
    ["Heart", "Coronary sinus", "**"],
    ["Heart", "Left coronary artery", "**"],
    ["Heart", "Atrial septal defect", "*"],
    ["Heart", "Interior of right atrium, development", "*"],
    ["Heart", "Arterial & venous drainage of heart", "**"],
    ["Vessels & Ducts", "Superior vena cava", "*"],
    ["Vessels & Ducts", "Arch of aorta", "****"],
    ["Vessels & Ducts", "Thoracic duct", "***"],
    ["Front of Thigh", "Femoral sheath", "***"],
    ["Front of Thigh", "Femoral canal", "**"],
    ["Front of Thigh", "Femoral hernia", "*"],
    ["Front of Thigh", "Femoral artery", "*"],
    ["Front of Thigh", "Sartorius", "**"],
    ["Front of Thigh", "Adductor / Hunter canal", "***"],
    ["Front of Thigh", "Superficial inguinal lymph nodes", "*"],
    ["Medial Thigh", "Obturator nerve", "*"],
    ["Medial Thigh", "Adductor magnus", "*"],
    ["Gluteal region", "Structures under cover of gluteus maximus", "*"],
    ["Gluteal region", "Trendelenberg test", "*"],
    ["Popliteal Fossa", "Popliteal Fossa", "***"],
    ["Popliteal Fossa", "Popliteal artery", "**"],
    ["Back of thigh", "Sciatic nerve", "****"],
    ["Back of thigh", "Flexor of Knee joint", "*"],
    ["Leg", "Popliteus muscle", "****"],
    ["Leg", "Soleus muscle", "*"],
    ["Leg", "Gastrocnemius muscle", "**"],
    ["Leg", "Tibialis posterior", "*"],
    ["Venous Drainage", "Varicose veins", "**"],
    ["Venous Drainage", "Long saphenous vein", "***"],
    ["Venous Drainage", "Venous drainage of lower limb", "**"],
    ["Joints of Lower Limb", "Inversion & eversion of foot", "***"],
    ["Joints of Lower Limb", "Knee Joint", "**"],
    ["Joints of Lower Limb", "Housemaid’s knee", "*"],
    ["Joints of Lower Limb", "Hip Joint", "*"],
    ["Arches of Foot", "Arches of Foot", "***"],
    ["Arches of Foot", "Factors maintaining medial longitudinal arch", "*"],
    ["Anterior abdominal wall", "Rectus sheath", "**"],
    ["Anterior abdominal wall", "Inguinal Canal", "**"],
    ["Anterior abdominal wall", "Contents of spermatic cord", "*"],
    ["Abdomen & Peritoneum", "Lesser omentum", "***"],
    ["Abdomen & Peritoneum", "Epiploic foramen", "*"],
    ["Stomach", "Stomach bed", "***"],
    ["Stomach", "Stomach Blood supply, histology, relations", "****"],
    ["Intestine", "Appendix", "***"],
    ["Intestine", "Meckel’s diverticulum", "*"],
    ["Intestine", "2nd part of duodenum", "***"],
    ["Large Blood vessels", "Porto caval anastomosis", "**"],
    ["Liver & Pancreas", "Head of pancreas - development", "***"],
    ["Liver & Pancreas", "Spleen gross, histology, functions", "*"],
    ["Kidney & Ureters", "Kidney relations, congenital anomalies", "**"],
    ["Suprarenal", "Suprarenal gland histology, development, blood supply", "**"],
    ["Diaphragm", "Diaphragm attachment, openings, nerve supply", "*"],
    ["Posterior Abdominal Wall", "Inferior vena cava tributaries & development", "**"],
    ["Perineum", "Ischiorectal fossa", "***"],
    ["Perineum", "Pudendal/Alcock’s canal", "*"],
    ["Urinary Bladder", "Urinary Bladder Relations, interior supply", "**"],
    ["Female reproductive Organ", "Uterus supports, development", "***"],
    ["Female reproductive Organ", "Ovary relations, blood supply, histology", "***"],
    ["Anal canal & Rectum", "Anal canal gross, interior, development", "***"],
    ["General Anatomy", "Blood supply of long bone", "*"],
    ["General Anatomy", "Epiphysis", "**"],
    ["General Anatomy", "Types of cartilagenous joints", "**"],
    ["General Anatomy", "Sutures", "*"],
    ["Genetics", "Karyotyping", "***"],
    ["Genetics", "Kleinfelter syndrome", "*"],
    ["Genetics", "Barr body", "*"]
];

const anatomyPaperISections = new Set(["Head Neck Face","Side of Neck","Anterior Triangles of Neck","Back of the neck","Parotid Gland","Temporal & Infratemporal region","Submandibular region","Structures in the neck","Cranial Cavity","Contents of the orbit","Nose, Paranasal Sinuses","Larynx","Tongue","Ear","Eyeball","Cranial Nerves","Brainstem","Cerebellum","Fourth ventricle","Cerebrum, Diencephalon","Spinal Cord","Visual & Auditory","Forearm & Hand","Arm","Pectoral region","Scapular region","Genetics"]);
const anatomyPaperIISections = new Set(["General Anatomy","Diaphragm","Walls of thorax","Mediastinum","The lungs","Heart","Abdomen & Peritoneum","Anterior abdominal wall","Posterior Abdominal Wall","Stomach","Intestine","Liver & Pancreas","Kidney & Ureters","Suprarenal","Urinary Bladder","Female reproductive Organ","Perineum","Anal canal & Rectum","Front of Thigh","Medial Thigh","Back of thigh","Gluteal region","Joints of Lower Limb","Popliteal Fossa","Leg","Arches of Foot","Large Blood vessels","Venous Drainage","Vessels & Ducts"]);
const anatomyLAQTopics = /blood supply|nerve supply|gland|joint|triangle|fossa|major nerve|major artery|heart|lung|diaphragm|stomach|pancreas|liver|kidney|uterus|ovary|anal canal|brainstem|cerebellum|internal capsule|corpus callosum|mammary|scalp|retina|larynx|development/i;
anatData.forEach(item => {
    const paper = anatomyPaperISections.has(item[0]) ? "Paper I" : "Paper II";
    const type = anatomyLAQTopics.test(item[1]) ? "LAQ" : "SAQ";
    addClassifiedBhalani("Anatomy", paper, item[0], item[1], item[2], type);
});


// ------------------------------------------------------------
// IMPORTING BHALANI 3.0 PHYSIOLOGY
// ------------------------------------------------------------
const physioData = [
    ["General Physiology", "Define homeostasis", "**"],
    ["General Physiology", "Various transport mechanism across cell membrane", "*"],
    ["General Physiology", "Active transport", "*"],
    ["General Physiology", "Facilitated diffusion", "*"],
    ["Nerve Muscle", "Action potential of Nerve ionic basis, phases", "*"],
    ["Nerve Muscle", "Saltatory conduction", "*"],
    ["Nerve Muscle", "Properties of nerve fibres", "*"],
    ["Nerve Muscle", "Factors affecting nerve conduction velocity", "*"],
    ["Nerve Muscle", "Neuromuscular transmission events, clinical importance", "***"],
    ["Nerve Muscle", "Myasthenia gravis cause, treatment", "*"],
    ["Nerve Muscle", "Sarcomere", "**"],
    ["Nerve Muscle", "Role of Calcium ions in excitation contraction coupling", "*"],
    ["Nerve Muscle", "Molecular basis of skeletal muscle contraction sliding filament", "**"],
    ["Nerve Muscle", "Isotonic & isometric contraction", "*"],
    ["Nerve Muscle", "Motor unit", "*"],
    ["Nerve Muscle", "Factors regulating force of skeletal muscle contraction", "*"],
    ["Blood", "Erythropoiesis factors regulating, stages", "**"],
    ["Blood", "Classify types of anaemia", "*"],
    ["Blood", "Define & classify immunity", "**"],
    ["Blood", "Enumerate function of T lymphocytes, relevance of HIV", "*"],
    ["Blood", "Primary & secondary immune response role in vaccination", "*"],
    ["Blood", "Humoral immunity", "*"],
    ["Blood", "Mechanism of blood coagulation", "***"],
    ["Blood", "Mechanism of common anticoagulant used in clinical practice", "*"],
    ["Blood", "Landsteiner’s Law", "*"],
    ["Blood", "Mismatched blood transfusion", "**"],
    ["Blood", "Erythroblastosis foetalis", "*"],
    ["CVS", "Baroreceptor mechanism", "**"],
    ["CVS", "CNS ischaemic response", "*"],
    ["CVS", "Mean bp - various short term mechanisms regulating bp", "**"],
    ["CVS", "Long term regulation of arterial blood pressure", "**"],
    ["CVS", "Heart block - types, explain AV Nodal block", "**"],
    ["CVS", "Normal Electrocardiogram", "**"],
    ["CVS", "Describe normal ecg, how its recorded", "**"],
    ["CVS", "Cardiac cycle", "***"],
    ["CVS", "Ejection fraction", "*"],
    ["CVS", "Note on Heart sounds", "*"],
    ["CVS", "Define cardiac output, factors affecting", "**"],
    ["CVS", "Factors controlling venous return", "*"],
    ["CVS", "Factors affecting stroke volume", "*"],
    ["CVS", "Poiseuille’s law significance", "*"],
    ["CVS", "Describe hypovolemic shock", "**"],
    ["CVS", "Define & Classify shock", "*"],
    ["Respiratory", "Lung compliance factors affecting", "*"],
    ["Respiratory", "Surfactant functions & applied RDS", "*"],
    ["Respiratory", "Explain work of breathing", "**"],
    ["Respiratory", "Note on obstructive lung disease", "*"],
    ["Respiratory", "Diffusion of gases respiratory membrane", "**"],
    ["Respiratory", "Oxygen transport", "***"],
    ["Respiratory", "Carbon dioxide transport", "***"],
    ["Respiratory", "Peripheral chemoreceptors", "*"],
    ["Respiratory", "Respiratory acidosis & alkalosis", "*"],
    ["Respiratory", "Describe chemical regulation of respiration", "**"],
    ["Respiratory", "Periodic breathing", "*"],
    ["Respiratory", "Neural regulation of respiration", "**"],
    ["Respiratory", "What is acclimatization", "*"],
    ["Respiratory", "Cardiorespiratory changes due to acclimatization at high altitudes", "*"],
    ["Exercise", "Cardiorespiratory changes during moderate exercise", "**"],
    ["Exercise", "VO2 Max", "*"],
    ["Renal", "Juxta glomerular apparatus functions diagram", "***"],
    ["Renal", "Define GFR dynamics, factors affecting, methods", "***"],
    ["Renal", "PCT", "*"],
    ["Renal", "Transport maximum", "*"],
    ["Renal", "Mechanism of glucose reabsorption in renal tubules", "**"],
    ["Renal", "Functions of DCT", "*"],
    ["Renal", "Counter current mechanism", "**"],
    ["Renal", "Role of JGA in regulation of blood pressure", "*"],
    ["Renal", "Micturition reflex", "***"],
    ["GIT", "Functions & composition of saliva", "*"],
    ["GIT", "Regulation of saliva secretion", "*"],
    ["GIT", "Mechanism of HCL secretion", "****"],
    ["GIT", "Peptic ulcer etiology & treatment", "**"],
    ["GIT", "Various gastrointestinal hormones", "*"],
    ["GIT", "Composition of gastric secretion & regulation", "*"],
    ["GIT", "Functionas, composition & Regulation of pancreatic juice", "*"],
    ["GIT", "Function & composition of bile salts", "*"],
    ["GIT", "Deglutition stages", "*"],
    ["GIT", "Movements of small intestine", "*"],
    ["GIT", "Movements of large intestine", "*"],
    ["GIT", "Defecation reflex", "**"],
    ["Endocrine", "Growth hormone mechanism of action, regulation", "***"],
    ["Endocrine", "Dwarfism, Gigantism, acromegaly", "*"],
    ["Endocrine", "Enumerate hormones of Anterior pituitary", "*"],
    ["Endocrine", "ADH role, factors stimulating secretion", "*"],
    ["Endocrine", "Physiological basis of diabetes insipidus", "*"],
    ["Endocrine", "Thyroid hormone synthesis, regulation, functions", "***"],
    ["Endocrine", "Cretinism", "*"],
    ["Endocrine", "Hyperthyroidism note", "*"],
    ["Endocrine", "Function & regulation of parathyroid hormone", "*"],
    ["Endocrine", "Tetany signs & treatment", "**"],
    ["Endocrine", "Describe regulation of calcium level in body", "**"],
    ["Endocrine", "Cushing’s syndrome", "*"],
    ["Endocrine", "Physiological actions of glucocorticoids", "*"],
    ["Endocrine", "Difference between diabetes mellitus & insipidus", "**"],
    ["Reproductive", "Spermatogenesis stages, hormonal regulation", "***"],
    ["Reproductive", "Define ovulation, mechanism, indicators", "*"],
    ["Reproductive", "Contraception methods", "**"],
    ["Reproductive", "Define menstrual cycle, phases with hormonal regulation", "**"],
    ["CNS", "Properties of synapse", "*"],
    ["CNS", "Presynaptic inhibition", "*"],
    ["CNS", "Enumerate different types of sensory receptors", "*"],
    ["CNS", "Properties of receptors", "*"],
    ["CNS", "Dorsal column medial lemniscal pathway origin, course, applied", "**"],
    ["CNS", "Define Stretch reflex & role in maintaining muscle tone", "*"],
    ["CNS", "Different types of pain, Referred pain examples", "***"],
    ["CNS", "Pyramidal tract origin, course, termination, applied", "**"],
    ["CNS", "Differentiate between UMN & LMN lesion", "*"],
    ["CNS", "Waves in EEG", "*"],
    ["CNS", "REM & NREM Sleep", "*"],
    ["CNS", "Define aphasia, difference between sensory & motor", "*"],
    ["CNS", "Define & classify memory, mechanisms of memory", "*"],
    ["Special Senses", "Pathway of taste sensation", "*"],
    ["Special Senses", "Neural pathway for smell sensation", "*"],
    ["Special Senses", "Structure of Organ of corti", "**"],
    ["Special Senses", "Functions of middle ear", "**"],
    ["Special Senses", "Causes of conductive deafness - tests for it", "*"],
    ["Special Senses", "Attenuation & significance", "*"],
    ["Special Senses", "Mechanism of hearing, pitch discrimination, impedance", "**"],
    ["Special Senses", "Accomodation reflex pathway", "***"],
    ["Special Senses", "Errors of refraction", "*"],
    ["Special Senses", "Dark adaptation curve, significance", "**"],
    ["Special Senses", "Photochemistry of vision", "*"],
    ["Special Senses", "Color vision", "*"],
    ["Temp Regulation", "Role of hypothalamus in temp regulation", "***"],
    ["Temp Regulation", "Shell temperature & core temperature", "*"],
    ["Temp Regulation", "Heat loss mechanism", "*"],
    ["Temp Regulation", "Body response to cold temperature", "**"]
];

const physiologyPaperISections = new Set(["General Physiology","Blood","Respiratory","CVS","Exercise","Renal","GIT"]);
const physiologyPaperIISections = new Set(["Endocrine","Reproductive","Special Senses","CNS","Temp Regulation","Nerve Muscle"]);
const physiologyLAQTopics = /mechanism|regulation|cardiac cycle|coagulation|transport|secretion|GFR|micturition|spermatogenesis|pain|temperature|action potential|neuromuscular/i;
physioData.forEach(item => {
    const paper = physiologyPaperISections.has(item[0]) ? "Paper I" : "Paper II";
    const type = physiologyLAQTopics.test(item[1]) ? "LAQ" : "SAQ";
    addClassifiedBhalani("Physiology", paper, item[0], item[1], item[2], type);
});


// ------------------------------------------------------------
// IMPORTING BHALANI 3.0 BIOCHEMISTRY
// ------------------------------------------------------------
const biochemData = [
    ["Amino Acids & Proteins", "Biologically important peptides", "**"],
    ["Amino Acids & Proteins", "Different structures of protein Secondary & tertiary", "**"],
    ["Amino Acids & Proteins", "Conjugation", "*"],
    ["Amino Acids & Proteins", "Functional & nutritional classification of proteins", "*"],
    ["Enzymes", "Diagnostic enzymes in cardiac diseases", "**"],
    ["Enzymes", "Isoenzymes diagnostic importance with examples", "***"],
    ["Enzymes", "Enzyme inhibition Competitive & Non competitive", "*"],
    ["Carbohydrates", "Glycosaminoglycans & significance", "****"],
    ["Carbohydrates", "HMP Shunt & its significance, regulation, multifunctional", "****"],
    ["Carbohydrates", "Glycogenesis & Glycogenolysis regulation", "*"],
    ["Carbohydrates", "Glycogen storage diseases", "**"],
    ["Carbohydrates", "Glycolytic pathway in RBCs", "*"],
    ["Carbohydrates", "Gluconeogenesis", "*"],
    ["Carbohydrates", "Rapaport Leubering cycle significance", "**"],
    ["Lipids", "Classification of phospholipids with examples", "***"],
    ["Lipids", "Lipoproteins", "*"],
    ["Lipids", "Beta oxidation of fatty acid energetics", "**"],
    ["Lipids", "Enumerate ketone bodies, formation & fate, ketosis", "*"],
    ["Lipids", "de novo synthesis of FAs", "*"],
    ["Lipids", "Fatty liver", "**"],
    ["Lipids", "Lipotropic factors", "*"],
    ["Cholesterol", "Biosynthesis & regulation of cholesterol", "***"],
    ["Cholesterol", "LDL & HDL role in atherosclerosis", "*"],
    ["Cholesterol", "Formation & transport of chylomicrons", "*"],
    ["Amino Acid Metabolism", "Formation & fate of ammonia (Urea cycle)", "**"],
    ["Amino Acid Metabolism", "Transamination & transmethylation reactions in brief", "**"],
    ["Amino Acid Metabolism", "Metabolism of glycine", "***"],
    ["Amino Acid Metabolism", "Metabolism of Phenylalanine", "**"],
    ["Amino Acid Metabolism", "Metabolism of Tyrosine", "**"],
    ["Amino Acid Metabolism", "Note on Alkaptonuria & Phenylketonuria", "**"],
    ["Biological Oxidation", "Oxidative phosphorylation", "*"],
    ["Biological Oxidation", "Uncouplers", "**"],
    ["Biological Oxidation", "ETC describe, functions, inhibitors", "***"],
    ["Heme Metabolism", "Heme synthesis & regulation, acute intermittent porphyria", "***"],
    ["Heme Metabolism", "Degradation of heme", "*"],
    ["Heme Metabolism", "Hemoglobinopathies", "*"],
    ["Heme Metabolism", "Formation & fate of bilirubin", "*"],
    ["Liver Function Tests", "Role of various enzymes in LFT", "**"],
    ["Liver Function Tests", "Test based on detoxification, excretory function", "*"],
    ["Kidney Function Tests", "Urea clearance test", "*"],
    ["Kidney Function Tests", "Creatinine clearance test", "*"],
    ["Plasma Proteins", "Immunoglobulins types, diagram & features", "**"],
    ["Plasma Proteins", "Functions of plasma proteins", "*"],
    ["Acid Base Balance", "Metabolic acidosis & alkalosis", "***"],
    ["Acid Base Balance", "Buffer systems", "**"],
    ["Acid Base Balance", "Role of kidney in maintaining acid-base balance", "*"],
    ["Water & Electrolytes", "Note on dehydration Primary & Secondary", "**"],
    ["Water & Electrolytes", "Water balance & regulation", "*"],
    ["Free Radicals", "Antioxidant vitamins & enzymes", "*"],
    ["Free Radicals", "Antioxidants", "*"],
    ["Detoxification", "What are xenobiotics, how are they detoxified", "***"],
    ["Vitamins", "Vit A sources, functions, deficiency, Wald’s Visual cycle", "**"],
    ["Vitamins", "Vit D Sources, RDA, chemistry, functions, deficiency", "**"],
    ["Vitamins", "Vitamin C", "**"],
    ["Mineral Metabolism", "Iron dietary sources, role, absorption, homeostasis", "**"],
    ["Mineral Metabolism", "Calcium sources, functions, RDA, disease manifestation", "***"],
    ["Mineral Metabolism", "Zinc", "*"],
    ["Mineral Metabolism", "Regulation of serum calcium levels", "**"],
    ["Energy & Nutrition", "Protein energy malnutrition Kwashiorkar & Marasmus", "***"],
    ["Energy & Nutrition", "Uses of dietary fibres", "*"],
    ["Energy & Nutrition", "Basal metabolic rate (BMR)", "**"],
    ["Nucleotide Metabolism", "Salvage pathway of Purine synthesis", "**"],
    ["Nucleotide Metabolism", "Catabolism of purine", "*"],
    ["Nucleotide Metabolism", "Biologically important nucleotides", "**"],
    ["Nucleotide Metabolism", "Primary & secondary gout", "**"],
    ["DNA & RNA", "Process of DNA replication, inhibitors", "**"],
    ["DNA & RNA", "Chargaff’s rule", "*"],
    ["DNA & RNA", "Different types of RNA", "*"],
    ["DNA & RNA", "Structure of tRNA diagram & functions", "*"],
    ["DNA & RNA", "Protein biosynthesis in prokaryotes, regulation", "*"],
    ["DNA & RNA", "Genetic code features", "***"],
    ["DNA & RNA", "Lac Operon", "*"],
    ["RDNA Technology", "Application of recombinant DNA technology", "**"],
    ["Hormones", "Secondary messengers, cyclic AMP", "**"],
    ["Hormones", "Hormonal regulation of blood glucose", "*"],
    ["Cancer", "Tumour markers enumerate", "**"],
    ["Cancer", "Proto oncogenes & oncogenes", "*"],
    ["Cancer", "Chemical carcinogens", "*"],
    ["Special Techniques", "Electrophoresis", "**"],
    ["Special Techniques", "Chromatography types", "*"],
    ["Special Techniques", "Principle & use of Flame photometer", "*"],
    ["General Biochemistry", "Starvation", "***"],
    ["General Biochemistry", "Radioactive isotopes diagnostic & therapeutic use", "*"]
];

const biochemistryPaperISections = new Set(["General Biochemistry","Enzymes","Carbohydrates","Lipids","Biological Oxidation","Detoxification","Free Radicals","Energy & Nutrition","Cancer"]);
const biochemistryPaperIISections = new Set(["Amino Acids & Proteins","Amino Acid Metabolism","DNA & RNA","Nucleotide Metabolism","Vitamins","Water & Electrolytes","Acid Base Balance","Mineral Metabolism","Heme Metabolism","Kidney Function Tests","Liver Function Tests","Hormones","RDNA Technology","Special Techniques","Plasma Proteins"]);
const biochemistryLAQTopics = /metabolism|biosynthesis|regulation|ETC|glycosaminoglycans|HMP shunt|heme synthesis|cholesterol|starvation|protein energy malnutrition|DNA replication|protein biosynthesis|genetic code|lac operon|detoxified|acid base|organ function/i;
biochemData.forEach(item => {
    const paper = biochemistryPaperISections.has(item[0]) ? "Paper I" : "Paper II";
    const type = biochemistryLAQTopics.test(item[1]) ? "LAQ" : "SAQ";
    addClassifiedBhalani("Biochemistry", paper, item[0], item[1], item[2], type);
});


/* ============================================================
   PHARMACOLOGY
   ============================================================ */

/* GENERAL PHARMACOLOGY */

addQ("Pharmacology","Paper I","General Pharmacology",
"Routes of Drug Administration","Tier 2","SAQ/SN",
"Routes of drug administration — enumerate with examples.");

addQ("Pharmacology","Paper I","General Pharmacology",
"Routes of Drug Administration","Tier 2","SAQ/SN",
"Factors governing choice of route of drug administration.");

addQ("Pharmacology","Paper I","General Pharmacology",
"Routes of Drug Administration","Tier 2","SAQ/SN",
"Subcutaneous route — advantages, disadvantages and examples.");

addQ("Pharmacology","Paper I","General Pharmacology",
"Routes of Drug Administration","Tier 2","SAQ/SN",
"Intravenous route — advantages, disadvantages and examples.");

addQ("Pharmacology","Paper I","General Pharmacology",
"Routes of Drug Administration","Tier 2","SAQ/SN",
"Transdermal therapeutic systems.");

addQ("Pharmacology","Paper I","Pharmacokinetics",
"Bioavailability","Tier 1","LAQ",
"Define bioavailability. Discuss factors affecting bioavailability with examples. Explain bioequivalence.");

addQ("Pharmacology","Paper I","Pharmacokinetics",
"Biotransformation","Tier 1","LAQ",
"Define biotransformation. Describe Phase I and Phase II reactions with examples. Discuss factors affecting biotransformation, enzyme induction and enzyme inhibition and their clinical significance.");

addQ("Pharmacology","Paper I","Pharmacokinetics",
"Microsomal Enzyme Induction","Tier 1","SAQ/SN",
"Define microsomal enzyme induction. Discuss clinical consequences, important examples and clinical implications.");

addQ("Pharmacology","Paper I","Pharmacokinetics",
"Prodrugs","Tier 2","SAQ/SN",
"Define prodrug. Discuss advantages of prodrugs with examples.");

addQ("Pharmacology","Paper I","Pharmacokinetics",
"Therapeutic Drug Monitoring","Tier 2","SAQ/SN",
"Define therapeutic drug monitoring. Discuss its clinical significance and give four drugs with narrow therapeutic index.");

addQ("Pharmacology","Paper I","Pharmacokinetics",
"Plasma Half-Life","Tier 2","SAQ/SN",
"Define plasma half-life. Discuss its clinical significance with examples.");

addQ("Pharmacology","Paper I","Pharmacokinetics",
"Prolongation of Drug Action","Tier 2","SAQ/SN",
"Describe methods of prolonging drug action with four methods and examples.");


/* PHARMACODYNAMICS */

addQ("Pharmacology","Paper I","Pharmacodynamics",
"Drug Antagonism","Tier 1","LAQ",
"Define and classify drug antagonism. Explain different types with examples. Discuss competitive antagonism, its features and examples.");

addQ("Pharmacology","Paper I","Pharmacodynamics",
"Drug Interactions","Tier 1","LAQ",
"Classify drug interactions. Explain mechanisms of drug interactions and discuss beneficial drug interactions with examples.");

addQ("Pharmacology","Paper I","Pharmacodynamics",
"Drug Absorption Interactions","Tier 2","SAQ/SN",
"Explain mechanisms by which drugs alter absorption of other drugs.");

addQ("Pharmacology","Paper I","Pharmacodynamics",
"Mechanism of Drug Action","Tier 2","SAQ/SN",
"Explain mechanisms by which drugs produce their actions in the body.");


/* PHARMACOTHERAPY */

addQ("Pharmacology","Paper I","Pharmacotherapy",
"Factors Affecting Drug Action","Tier 1","LAQ",
"Discuss factors affecting drug action, their clinical relevance and examples.");

addQ("Pharmacology","Paper I","Pharmacotherapy",
"Tolerance and Tachyphylaxis","Tier 2","SAQ/SN",
"Define drug tolerance. Discuss types, mechanisms and examples. Define tachyphylaxis and explain its mechanism. Differentiate tolerance and tachyphylaxis.");

addQ("Pharmacology","Paper I","Pharmacotherapy",
"Fixed Dose Combinations","Tier 2","SAQ/SN",
"Discuss advantages and disadvantages of fixed dose combinations with examples.");


/* ADR */

addQ("Pharmacology","Paper I","Adverse Drug Reactions",
"Pharmacovigilance","Tier 1","LAQ",
"Define pharmacovigilance. Classify adverse drug reactions and explain various types with examples.");

addQ("Pharmacology","Paper I","Adverse Drug Reactions",
"Adverse Drug Reactions","Tier 2","SAQ/SN",
"Classify adverse drug reactions with examples.");


/* ANS */

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Anticholinesterases","Tier 1","LAQ",
"Classify anticholinesterases. Compare reversible and irreversible anticholinesterases. Explain mechanism of action, therapeutic uses and clinical situations where reversible or irreversible properties are exploited.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Organophosphate Poisoning","Tier 1","LAQ",
"Discuss general principles of treatment of acute poisoning. Describe clinical features and drug treatment of organophosphate poisoning.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Neostigmine","Tier 1","SAQ/SN",
"Discuss pharmacological actions, mechanism of action and therapeutic uses of neostigmine.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Myasthenia Gravis","Tier 2","SAQ/SN",
"Discuss drugs used in myasthenia gravis and the role of anticholinesterases.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Cholinergic Drugs","Tier 2","SAQ/SN",
"Classify cholinergic drugs and explain the rationale for combining atropine with neostigmine.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Atropine","Tier 1","SAQ/SN",
"Write four clinical uses of atropine. Discuss atropine substitutes and important drug-of-choice situations.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Atropine","Tier 2","SAQ/SN",
"Compare atropine and tropicamide as mydriatics. Discuss therapeutic uses of atropine.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Adrenaline","Tier 1","LAQ",
"Discuss pharmacological actions, therapeutic uses with rationale, adverse effects, precautions, dose and routes of administration of adrenaline. Explain its use in anaphylactic shock.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Adrenaline","Tier 1","SAQ/SN",
"Discuss four therapeutic uses of adrenaline with pharmacological justification.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Adrenergic Drugs","Tier 2","SAQ/SN",
"Enumerate vasopressor agents, explain why adrenaline may be contraindicated in certain forms of shock and classify adrenergic drugs.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Beta Blockers","Tier 1","LAQ",
"Classify beta blockers. Discuss cardiac and non-cardiac uses and explain therapeutic uses with rationale.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Propranolol","Tier 1","SAQ/SN",
"Discuss therapeutic uses of propranolol with rationale and its antiarrhythmic effects.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Propranolol vs Atenolol","Tier 2","SAQ/SN",
"Compare propranolol and atenolol with eight clinically relevant differences.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Alpha Blockers","Tier 2","SAQ/SN",
"Discuss uses and adverse effects of alpha blockers.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Glaucoma","Tier 1","LAQ",
"Classify drugs used in glaucoma. Discuss mechanisms of action, adverse effects and pharmacological rationale for use.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Skeletal Muscle Relaxants","Tier 1","LAQ",
"Classify skeletal muscle relaxants according to mechanism. Discuss succinylcholine mechanism, adverse effects and therapeutic uses. Mention uses of curare alkaloids.");

addQ("Pharmacology","Paper I","Autonomic Nervous System",
"Neuromuscular Blockers","Tier 2","SAQ/SN",
"Describe depolarizing neuromuscular blockers with examples and mechanism.");


/* CARDIOVASCULAR */

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"ACE Inhibitors","Tier 1","LAQ",
"Discuss mechanism of action, therapeutic uses, adverse effects, contraindications and drug interactions of ACE inhibitors. Explain their use in CHF.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"ACE Inhibitors vs ARBs","Tier 1","SAQ/SN",
"Compare ACE inhibitors and ARBs with emphasis on adverse effects.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Enalapril vs Losartan","Tier 1","SAQ/SN",
"Compare enalapril and losartan with respect to mechanism, indications and adverse effects.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"RAAS Drugs","Tier 2","SAQ/SN",
"Enumerate drugs acting on the renin-angiotensin-aldosterone system.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"ACE Inhibitors in CHF","Tier 2","SAQ/SN",
"Explain the role of ACE inhibitors in CHF.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Congestive Heart Failure","Tier 1","LAQ",
"Discuss treatment of CHF, therapeutic objectives, drugs used and pharmacological basis. Explain the roles of ACE inhibitors and cardiac glycosides.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Digoxin","Tier 1","SAQ/SN",
"Explain mechanism of action of digoxin, its use in CHF, pharmacological basis, digitalis toxicity and treatment.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Spironolactone","Tier 2","SAQ/SN",
"Explain the rationale and interactions of spironolactone in CHF.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Antiarrhythmics","Tier 1","LAQ",
"Classify antiarrhythmic drugs and discuss mechanisms of action. Explain propranolol's antiarrhythmic effects and uses.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Calcium Channel Blockers","Tier 1","LAQ",
"Explain mechanism of action of calcium channel blockers in angina, therapeutic uses and adverse effects.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Nitrates","Tier 1","SAQ/SN",
"Explain mechanism of action of nitrates. Discuss nitroglycerin therapeutic uses, routes and adverse effects.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Coronary Steal","Tier 2","SAQ/SN",
"Explain coronary steal phenomenon and its clinical significance.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Nifedipine vs Verapamil","Tier 2","SAQ/SN",
"Compare nifedipine and verapamil.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Myocardial Infarction","Tier 2","SAQ/SN",
"Discuss drug management of myocardial infarction.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Antihypertensive Drugs","Tier 1","LAQ",
"Classify antihypertensive drugs. Discuss management of hypertensive emergencies and urgencies, thiazide mechanism and combination therapy in hypertension.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Furosemide","Tier 1","LAQ",
"Discuss mechanism, indications, adverse effects and therapeutic uses of furosemide. Explain its use in left ventricular failure.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"High Ceiling Diuretics","Tier 2","SAQ/SN",
"Discuss uses of high-ceiling diuretics.");

addQ("Pharmacology","Paper I","Cardiovascular Pharmacology",
"Diuretic Therapy","Tier 2","SAQ/SN",
"Discuss therapeutic uses and complications of diuretic therapy.");


/* BLOOD */

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Iron Preparations","Tier 1","LAQ",
"Enumerate oral iron preparations, discuss adverse effects and treatment of iron deficiency anaemia. Discuss parenteral iron, indications and treatment of iron poisoning.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Iron Preparations","Tier 2","SAQ/SN",
"Name two oral and two parenteral iron preparations. Discuss uses and adverse effects.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Thrombolytic Drugs","Tier 1","LAQ",
"Enumerate thrombolytic drugs. Discuss alteplase indications and adverse effects.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Heparin vs LMWH","Tier 1","SAQ/SN",
"Compare unfractionated heparin and LMWH.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Warfarin","Tier 1","SAQ/SN",
"Explain mechanism and therapeutic uses of warfarin.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"LMWH","Tier 1","SAQ/SN",
"Explain mechanism and uses of low molecular weight heparin.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Streptokinase vs Alteplase","Tier 2","SAQ/SN",
"Compare streptokinase and alteplase.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Antiplatelet Drugs","Tier 2","SAQ/SN",
"Discuss antiplatelet drugs.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Statins","Tier 1","LAQ",
"Discuss mechanism of action, therapeutic effects and adverse effects of statins.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"HMG-CoA Reductase Inhibitors","Tier 2","SAQ/SN",
"Discuss HMG-CoA reductase inhibitors.");

addQ("Pharmacology","Paper I","Drugs Affecting Blood",
"Plasma Expanders","Tier 2","SAQ/SN",
"Define plasma expanders and discuss their uses.");


/* GI */

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Peptic Ulcer Drugs","Tier 1","LAQ",
"Classify drugs used in peptic ulcer and discuss pharmacological basis of treatment. Explain omeprazole mechanism and adverse effects.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"H. pylori","Tier 1","SAQ/SN",
"Discuss treatment regimens for H. pylori-positive gastric ulcer.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Zollinger-Ellison Syndrome","Tier 1","SAQ/SN",
"Explain the role of omeprazole in Zollinger-Ellison syndrome.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Ranitidine","Tier 2","SAQ/SN",
"Discuss indications and adverse effects of ranitidine.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Metoclopramide","Tier 2","SAQ/SN",
"Explain mechanism and therapeutic uses of metoclopramide.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Prokinetic Agents","Tier 2","SAQ/SN",
"Define prokinetic agents, give examples and discuss uses and adverse effects.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Laxatives","Tier 1","LAQ",
"Classify laxatives and purgatives. Explain mechanisms, indications of major classes and contraindications.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Lactulose","Tier 2","SAQ/SN",
"Explain mechanism and uses of lactulose.");

addQ("Pharmacology","Paper I","Gastrointestinal Pharmacology",
"Ispaghula","Tier 2","SAQ/SN",
"Explain mechanism of ispaghula as a laxative.");


/* MISC */

addQ("Pharmacology","Paper I","Miscellaneous",
"Desferrioxamine","Tier 2","SAQ/SN",
"Explain mechanism and uses of desferrioxamine.");

addQ("Pharmacology","Paper I","Miscellaneous",
"Dimercaprol","Tier 2","SAQ/SN",
"Discuss dimercaprol.");

addQ("Pharmacology","Paper I","Miscellaneous",
"Chelating Agents","Tier 2","SAQ/SN",
"Discuss chelating agents used clinically.");

addQ("Pharmacology","Paper I","Miscellaneous",
"Antioxidant Vitamins","Tier 2","SAQ/SN",
"Discuss antioxidant vitamins and their uses.");

addQ("Pharmacology","Paper I","Miscellaneous",
"Vitamin A","Tier 2","SAQ/SN",
"Discuss daily requirement and therapeutic uses of vitamin A.");

addQ("Pharmacology","Paper I","Miscellaneous",
"Folic Acid vs Iron","Tier 2","SAQ/SN",
"Compare folic acid and iron supplementation during pregnancy and explain the rationale.");

addQ("Pharmacology","Paper I","Miscellaneous",
"Catecholamines","Tier 2","SAQ/SN",
"Compare catecholamines and non-catecholamines.");

addQ("Pharmacology","Paper I","Miscellaneous",
"Drug Use in Children","Tier 2","SAQ/SN",
"Discuss general principles of drug use in children.");


/* PAPER II */

addQ("Pharmacology","Paper II","Autacoids",
"Antihistaminics","Tier 1","LAQ",
"Classify H1 antihistaminics. Discuss uses and adverse effects. Compare first-generation and second-generation antihistaminics and explain advantages of non-sedating antihistaminics.");

addQ("Pharmacology","Paper II","Autacoids",
"Migraine","Tier 1","SAQ/SN",
"Discuss prophylaxis of migraine and explain mechanism and adverse effects of sumatriptan.");

addQ("Pharmacology","Paper II","Autacoids",
"Prostaglandins","Tier 1","SAQ/SN",
"Discuss therapeutic uses of prostaglandin analogues in pregnancy and labour and identify preferred agents for induction of labour.");

addQ("Pharmacology","Paper II","Autacoids",
"NSAIDs / Aspirin","Tier 1","LAQ",
"Classify NSAIDs. Discuss aspirin mechanism, uses, adverse effects and contraindications. Explain selective NSAIDs and their advantages and disadvantages.");

addQ("Pharmacology","Paper II","Autacoids",
"Aspirin vs COX-2 Inhibitors","Tier 1","SAQ/SN",
"Compare aspirin and COX-2 inhibitors with respect to pharmacological actions, uses and adverse effects.");

addQ("Pharmacology","Paper II","Autacoids",
"NSAIDs","Tier 2","SAQ/SN",
"Discuss important uses and adverse effects of NSAIDs.");

addQ("Pharmacology","Paper II","Autacoids",
"Opioids vs NSAIDs","Tier 2","SAQ/SN",
"Compare opioids and NSAIDs.");

addQ("Pharmacology","Paper II","Autacoids",
"Diclofenac","Tier 2","SAQ/SN",
"Discuss diclofenac sodium.");

addQ("Pharmacology","Paper II","Autacoids",
"Methotrexate","Tier 1","SAQ/SN",
"Explain the pharmacological basis of methotrexate use in rheumatoid arthritis and give four therapeutic uses with rationale.");

addQ("Pharmacology","Paper II","Autacoids",
"Antigout Drugs","Tier 2","SAQ/SN",
"Classify drugs used in gout and explain their mechanisms.");


/* RESPIRATORY */

addQ("Pharmacology","Paper II","Respiratory Pharmacology",
"Bronchial Asthma","Tier 1","LAQ",
"Classify drugs used in bronchial asthma. Explain mechanisms of action, beta-2 agonists, inhaled corticosteroids and adverse effects.");

addQ("Pharmacology","Paper II","Respiratory Pharmacology",
"Beta-2 Agonists","Tier 1","SAQ/SN",
"Discuss examples, mechanism and adverse effects of beta-2 agonists.");

addQ("Pharmacology","Paper II","Respiratory Pharmacology",
"Inhaled Corticosteroids","Tier 1","SAQ/SN",
"Explain the pharmacological basis of budesonide and inhaled corticosteroids.");

addQ("Pharmacology","Paper II","Respiratory Pharmacology",
"Aminophylline","Tier 2","SAQ/SN",
"Discuss mechanism and adverse effects of aminophylline.");

addQ("Pharmacology","Paper II","Respiratory Pharmacology",
"Mucolytics","Tier 2","SAQ/SN",
"Give examples of mucolytics and discuss indications and mechanisms.");

addQ("Pharmacology","Paper II","Respiratory Pharmacology",
"Antitussives","Tier 2","SAQ/SN",
"Discuss antitussives.");

addQ("Pharmacology","Paper II","Respiratory Pharmacology",
"Bromhexine","Tier 2","SAQ/SN",
"Discuss bromhexine.");


/* HORMONES */

addQ("Pharmacology","Paper II","Hormones",
"Antithyroid Drugs","Tier 1","LAQ",
"Classify antithyroid drugs. Discuss carbimazole therapeutic uses and adverse effects.");

addQ("Pharmacology","Paper II","Hormones",
"Propranolol in Thyrotoxicosis","Tier 2","SAQ/SN",
"Explain the rationale for use of propranolol in thyrotoxicosis.");

addQ("Pharmacology","Paper II","Hormones",
"Radioactive Iodine","Tier 2","SAQ/SN",
"Discuss advantages and disadvantages of radioactive iodine.");

addQ("Pharmacology","Paper II","Hormones",
"Oral Hypoglycaemic Drugs","Tier 1","LAQ",
"Classify oral hypoglycaemic agents. Discuss biguanides, sulfonylureas and thiazolidinediones with mechanisms, uses and adverse effects.");

addQ("Pharmacology","Paper II","Hormones",
"Insulin","Tier 1","LAQ",
"Discuss sources of insulin, indications and advantages of human insulin over conventional insulin.");

addQ("Pharmacology","Paper II","Hormones",
"Insulin Preparations","Tier 2","SAQ/SN",
"Discuss insulin preparations and analogues.");

addQ("Pharmacology","Paper II","Hormones",
"Diabetic Ketoacidosis","Tier 2","SAQ/SN",
"Discuss treatment of diabetic ketoacidosis.");

addQ("Pharmacology","Paper II","Hormones",
"Metformin","Tier 2","SAQ/SN",
"Explain mechanism of metformin.");

addQ("Pharmacology","Paper II","Hormones",
"Corticosteroids","Tier 1","LAQ",
"Classify corticosteroids. Discuss anti-inflammatory and immunosuppressant actions, therapeutic uses, adverse effects, contraindications and precautions.");

addQ("Pharmacology","Paper II","Hormones",
"Corticosteroids","Tier 2","SAQ/SN",
"Give four therapeutic indications and four contraindications of corticosteroids. Discuss topical corticosteroids in dermatological conditions.");

addQ("Pharmacology","Paper II","Hormones",
"Oral Contraceptives","Tier 1","LAQ",
"Classify oral contraceptive pills. Discuss mechanism, adverse effects, non-contraceptive benefits, dosage schedule and postcoital contraception.");

addQ("Pharmacology","Paper II","Hormones",
"SERMs","Tier 2","SAQ/SN",
"Enumerate SERMs and discuss therapeutic uses and adverse effects.");

addQ("Pharmacology","Paper II","Hormones",
"Progesterone","Tier 2","SAQ/SN",
"Discuss uses and adverse effects of progesterone.");

addQ("Pharmacology","Paper II","Hormones",
"Emergency Contraception","Tier 2","SAQ/SN",
"Discuss emergency contraception.");

addQ("Pharmacology","Paper II","Hormones",
"Mifepristone","Tier 2","SAQ/SN",
"Discuss mechanism and uses of mifepristone.");

addQ("Pharmacology","Paper II","Hormones",
"Oxytocics","Tier 1","LAQ",
"Classify oxytocics. Discuss uses, adverse effects and clinical indications of individual drugs. Compare oxytocin with prostaglandin analogues and ergometrine.");

addQ("Pharmacology","Paper II","Hormones",
"Ergometrine","Tier 2","SAQ/SN",
"Explain pharmacological basis and contraindications of ergometrine in PPH.");

addQ("Pharmacology","Paper II","Hormones",
"Oxytocin","Tier 2","SAQ/SN",
"Explain why oxytocin is used for induction of labour rather than methylergometrine.");


/* CNS */

addQ("Pharmacology","Paper II","CNS",
"Pre-anaesthetic Medication","Tier 2","SAQ/SN",
"Discuss pre-anaesthetic medication, drugs used, pharmacological basis and purpose of each drug.");

addQ("Pharmacology","Paper II","CNS",
"Alcohol Dependence","Tier 1","LAQ",
"Discuss drug dependence and management of chronic alcoholism.");

addQ("Pharmacology","Paper II","CNS",
"Sedative Hypnotics","Tier 1","LAQ",
"Classify sedative-hypnotic drugs. Discuss advantages of benzodiazepines over barbiturates, mechanism of benzodiazepines and therapeutic uses.");

addQ("Pharmacology","Paper II","CNS",
"Benzodiazepines vs Barbiturates","Tier 2","SAQ/SN",
"Compare benzodiazepines and barbiturates.");

addQ("Pharmacology","Paper II","CNS",
"Barbiturates","Tier 2","SAQ/SN",
"Classify barbiturates.");

addQ("Pharmacology","Paper II","CNS",
"Antiepileptic Drugs","Tier 1","LAQ",
"Classify antiepileptic drugs according to clinical utility and mechanism. Discuss phenytoin, sodium valproate, carbamazepine, status epilepticus, principles of treatment, GTCS and important drug interactions.");

addQ("Pharmacology","Paper II","CNS",
"Antiparkinsonian Drugs","Tier 1","LAQ",
"Classify antiparkinsonian drugs and explain the rationale for combining levodopa with carbidopa.");

addQ("Pharmacology","Paper II","CNS",
"Levodopa + Carbidopa","Tier 2","SAQ/SN",
"Discuss advantages and disadvantages of levodopa plus carbidopa.");

addQ("Pharmacology","Paper II","CNS",
"Atypical Antipsychotics","Tier 2","SAQ/SN",
"Enumerate atypical antipsychotics and discuss their advantages over conventional neuroleptics.");

addQ("Pharmacology","Paper II","CNS",
"Antidepressants","Tier 1","LAQ",
"Classify antidepressants. Discuss SSRIs, therapeutic uses and adverse effects.");

addQ("Pharmacology","Paper II","CNS",
"Antianxiety Drugs","Tier 2","SAQ/SN",
"Give examples of antianxiety drugs and explain their mechanisms.");

addQ("Pharmacology","Paper II","CNS",
"Opioid Analgesics","Tier 1","LAQ",
"Enumerate opium alkaloids. Discuss morphine mechanism, adverse effects and clinical uses.");

addQ("Pharmacology","Paper II","CNS",
"Acute Morphine Poisoning","Tier 1","SAQ/SN",
"Discuss treatment of acute morphine poisoning.");

addQ("Pharmacology","Paper II","CNS",
"Morphine in Head Injury","Tier 1","SAQ/SN",
"Explain why morphine is contraindicated in head injury.");

addQ("Pharmacology","Paper II","CNS",
"Pethidine vs Morphine","Tier 2","SAQ/SN",
"Compare pethidine and morphine with respect to advantages.");

addQ("Pharmacology","Paper II","CNS",
"Opioid Antagonists","Tier 2","SAQ/SN",
"Classify opioid antagonists and discuss their uses.");

addQ("Pharmacology","Paper II","CNS",
"Opioids vs NSAIDs","Tier 2","SAQ/SN",
"Compare opioids and NSAIDs.");


/* ANTIMICROBIAL */

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Antimicrobial Selection","Tier 1","LAQ",
"Discuss factors involved in selection of an antibiotic for a given infection.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Antimicrobial Prophylaxis","Tier 2","SAQ/SN",
"Discuss antimicrobial prophylaxis.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Chemoprophylaxis","Tier 2","SAQ/SN",
"Discuss chemoprophylaxis and chemoprophylaxis in rheumatic fever.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Fluoroquinolones","Tier 1","LAQ",
"Classify fluoroquinolones. Compare first and second generation, spectrum, advantages, adverse effects and indications.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Fluoroquinolones","Tier 2","SAQ/SN",
"Discuss four therapeutic uses and adverse effects of fluoroquinolones.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Cotrimoxazole","Tier 2","SAQ/SN",
"Explain mechanism and four therapeutic uses of cotrimoxazole.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Cephalosporins","Tier 1","LAQ",
"Classify cephalosporins by generations with examples. Explain mechanism, adverse effects and therapeutic uses, including third-generation cephalosporins.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Penicillins","Tier 1","LAQ",
"Classify penicillins. Discuss mechanism, adverse effects and therapeutic uses. Explain ampicillin.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Penicillin Resistance","Tier 2","SAQ/SN",
"Discuss bacterial resistance to penicillin.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Clavulanic Acid","Tier 2","SAQ/SN",
"Explain the rationale for combining clavulanic acid with amoxicillin.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Aminoglycosides","Tier 1","LAQ",
"Classify or enumerate aminoglycosides. Discuss mechanism, clinical uses, adverse effects and shared toxicities. Explain streptomycin.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Macrolides vs Tetracyclines","Tier 2","SAQ/SN",
"Compare macrolides and tetracyclines with respect to spectrum, uses, adverse reactions and precautions.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Antitubercular Drugs","Tier 1","LAQ",
"Classify antitubercular drugs. Discuss rifampicin antimicrobial action, pharmacokinetics and adverse effects. Explain causes of treatment failure and management of MDR-TB.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"TB Chemoprophylaxis","Tier 2","SAQ/SN",
"Discuss chemoprophylaxis in tuberculosis.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"XDR-TB","Tier 2","SAQ/SN",
"Discuss drugs used for XDR-TB.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"DOTS","Tier 2","SAQ/SN",
"Discuss DOTS.");

addQ("Pharmacology","Paper II","Antimicrobial Pharmacology",
"Antileprotic Drugs","Tier 2","SAQ/SN",
"Discuss treatment of multibacillary leprosy.");

addQ("Pharmacology","Paper II","Antimalarial Drugs",
"Antimalarial Drugs","Tier 1","LAQ",
"Classify antimalarial drugs. Discuss artemisinin derivatives, mechanism, uses, adverse effects, ACT rationale and regimens, treatment of acute uncomplicated falciparum malaria and chloroquine.");

addQ("Pharmacology","Paper II","Antimalarial Drugs",
"ACT","Tier 2","SAQ/SN",
"Discuss indications and advantages of ACT, three ACT regimens and the rationale for combining drugs.");

addQ("Pharmacology","Paper II","Antimalarial Drugs",
"Antimalarial Life Cycle Action","Tier 2","SAQ/SN",
"Explain terms describing antimalarial action according to parasite life cycle.");

addQ("Pharmacology","Paper II","Antiameobic Drugs",
"Metronidazole","Tier 2","SAQ/SN",
"Discuss four uses, adverse effects and place in therapy of metronidazole, including dose, route and duration.");

addQ("Pharmacology","Paper II","Antineoplastic Drugs",
"Alkylating Agents","Tier 2","SAQ/SN",
"Discuss alkylating agents used in cancer chemotherapy.");

addQ("Pharmacology","Paper II","Antineoplastic Drugs",
"Methotrexate","Tier 2","SAQ/SN",
"Discuss four therapeutic uses of methotrexate with pharmacological basis.");

addQ("Pharmacology","Paper II","Immunosuppressants",
"Immunosuppressants","Tier 2","SAQ/SN",
"Classify immunosuppressants. Discuss calcineurin inhibitors, mechanisms, indications and therapeutic uses.");

addQ("Pharmacology","Paper II","Antiseptics / Disinfectants",
"Scabies","Tier 2","SAQ/SN",
"Discuss drugs used in scabies, including merits and demerits.");

addQ("Pharmacology","Paper II","Vaccines / Sera",
"Antisera","Tier 2","SAQ/SN",
"Define antisera and give examples with indications.");

addQ("Pharmacology","Paper II","Vaccines / Sera",
"Vaccines","Tier 2","SAQ/SN",
"Define vaccines and discuss BCG and examples of viral vaccines.");


/* ============================================================
   PATHOLOGY
   ============================================================ */

function P(topic,tier,type,question,paper="Paper I",section="General Pathology"){
    addQ("Pathology",paper,section,topic,tier,type,question);
}

P("Necrosis","Tier 1","LAQ",
"Define necrosis. Classify its types with examples. Explain mechanisms. Describe caseous necrosis morphology and compare coagulative and liquefactive necrosis.");

P("Apoptosis","Tier 1","SAQ/SN",
"Define apoptosis. Discuss physiological and pathological causes, morphological changes, mechanisms and examples.");

P("Calcification","Tier 1","SAQ/SN",
"Differentiate dystrophic and metastatic calcification with types and examples.");

P("Fatty Change","Tier 1","LAQ",
"Discuss etiopathogenesis of fatty change and morphology of fatty liver.");

P("Free Radical Injury","Tier 2","SAQ/SN",
"Discuss free radicals and free-radical-induced cell injury.");

P("Endogenous Pigments","Tier 2","SAQ/SN",
"Discuss endogenous pigments.");

P("Metaplasia","Tier 2","SAQ/SN",
"Discuss metaplasia.");

P("Hypertrophy and Hyperplasia","Tier 2","SAQ/SN",
"Discuss hypertrophy and hyperplasia.");

P("Atrophy","Tier 2","SAQ/SN",
"Discuss atrophy.");

P("Brown Atrophy of Heart","Tier 2","SAQ/SN",
"Discuss brown atrophy of heart.");

P("Reperfusion Injury","Tier 2","SAQ/SN",
"Discuss reperfusion injury.");

P("Amyloidosis","Tier 1","LAQ",
"Define amyloid. Discuss classification, molecular structure, physicochemical properties, special stains, sago spleen and morphology of splenic amyloidosis.");

P("Hypersensitivity","Tier 1","LAQ",
"Define and classify hypersensitivity. Explain type I hypersensitivity and its mechanism.");

P("Autoimmune Disorders","Tier 2","SAQ/SN",
"Discuss mechanisms of autoimmune disorders.");

P("AIDS","Tier 1","LAQ",
"Discuss etiology, routes of transmission, natural history/phases and diagnosis of AIDS.");

P("Oedema","Tier 1","LAQ",
"Define oedema. Classify types and explain pathogenesis. Discuss pulmonary oedema mechanism and morphology and compare transudate and exudate.");

P("Thrombosis","Tier 1","LAQ",
"Define thrombosis. Discuss pathogenesis, types, fate and complications. Explain Virchow triad.");

P("Embolism","Tier 1","LAQ",
"Define embolism. Classify types with examples. Discuss pathogenesis, morphology and fate, including pulmonary thromboembolism and air embolism.");

P("Infarction","Tier 2","SAQ/SN",
"Define infarction and classify its types.");

P("Systemic Oedema","Tier 2","SAQ/SN",
"Discuss systemic oedema due to heart failure.");

P("Right-sided Heart Failure","Tier 2","SAQ/SN",
"Discuss liver and spleen changes in right-sided heart failure.");

P("Acute Inflammation","Tier 1","LAQ",
"Define acute inflammation. Describe cardinal signs, vascular events, cellular events and chemical mediators.");

P("Wound Healing","Tier 1","LAQ",
"Discuss factors affecting wound healing, complications and healing by primary and secondary intention.");

P("Fracture Healing","Tier 1","LAQ",
"Discuss healing of a simple fracture of bone, regeneration and repair, factors affecting healing and complications.");

P("Chemotaxis and Phagocytosis","Tier 2","SAQ/SN",
"Discuss chemotaxis and phagocytosis.");

P("Granulation Tissue","Tier 2","SAQ/SN",
"Discuss granulation tissue.");

P("Primary Tuberculosis","Tier 2","SAQ/SN",
"Discuss primary tuberculosis and Ghon complex.");

P("Leprosy Classification","Tier 2","SAQ/SN",
"Discuss Ridley-Jopling classification of leprosy.");

P("Neoplasia","Tier 1","LAQ",
"Define neoplasia. Discuss classification, etiopathogenesis and laboratory diagnosis.");

P("Benign vs Malignant","Tier 1","SAQ/SN",
"Differentiate benign and malignant tumours and discuss routes/modes of spread.");

P("Metastasis","Tier 1","SAQ/SN",
"Define metastasis. Discuss mechanisms and routes of spread.");

P("Chemical Carcinogenesis","Tier 1","SAQ/SN",
"Discuss major chemical carcinogens, classification, mechanism and steps of carcinogenesis.");

P("Tumour Markers","Tier 2","SAQ/SN",
"Discuss tumour markers.");

P("Paraneoplastic Syndromes","Tier 2","SAQ/SN",
"Discuss paraneoplastic syndromes.");

P("Oncogenic Viruses","Tier 2","SAQ/SN",
"Discuss oncogenic viruses.");

P("Precancerous Lesions","Tier 2","SAQ/SN",
"Discuss precancerous lesions.");

P("Laboratory Diagnosis of Cancer","Tier 2","SAQ/SN",
"Discuss laboratory diagnosis of cancer.");

P("Anaplasia","Tier 2","SAQ/SN",
"Discuss anaplasia.");

P("Anaemia","Tier 1","LAQ",
"Define anaemia. Discuss classification including morphological classification and laboratory diagnosis of iron deficiency anaemia.");

P("Megaloblastic Anaemia","Tier 1","SAQ/SN",
"Discuss laboratory investigations, peripheral smear and bone marrow findings in megaloblastic anaemia.");

P("Haemolytic Anaemia","Tier 2","SAQ/SN",
"Discuss laboratory investigations in haemolytic anaemia.");

P("Sickle Cell Anaemia","Tier 2","SAQ/SN",
"Discuss etiopathogenesis and laboratory findings of sickle cell anaemia.");

P("Megaloblast","Tier 2","SAQ/SN",
"Discuss megaloblast.");

P("Bleeding Disorders","Tier 1","LAQ",
"Define and classify bleeding disorders. Discuss screening laboratory tests.");

P("Blood Transfusion Reactions","Tier 1","LAQ",
"Discuss blood transfusion reactions and investigation of a suspected transfusion reaction.");

P("Blood Components","Tier 1","SAQ/SN",
"Discuss blood components.");

P("Haemophilia","Tier 2","SAQ/SN",
"Discuss haemophilia.");

P("Prothrombin Time","Tier 2","SAQ/SN",
"Explain principle of prothrombin time and causes of increased PT.");

P("Thrombocytopenia","Tier 2","SAQ/SN",
"Discuss causes of thrombocytopenia.");

P("Blood Donor Selection","Tier 2","SAQ/SN",
"Discuss blood donor selection criteria.");

P("Coombs Test","Tier 2","SAQ/SN",
"Compare direct and indirect Coombs tests and their indications.");

P("Leukemia","Tier 1","LAQ",
"Define and classify leukemia. Discuss CML peripheral blood and bone marrow findings, acute leukemia FAB classification, cytochemical stains and laboratory findings.");

P("AML","Tier 2","SAQ/SN",
"Discuss AML FAB classification.");

P("ALL","Tier 2","SAQ/SN",
"Discuss peripheral smear and bone marrow findings in ALL.");

P("CML","Tier 2","SAQ/SN",
"Discuss clinical features and blood picture of CML.");


/* PATH PAPER II */

P("Atherosclerosis","Tier 1","LAQ",
"Discuss pathogenesis, morphology, complications and risk factors of atherosclerosis.",
"Paper II","Cardiovascular System");

P("Myocardial Infarction","Tier 1","LAQ",
"Discuss laboratory diagnosis, morphological changes according to age, gross and microscopic features, consequences, complications and enzymes used in diagnosis of myocardial infarction.",
"Paper II","Cardiovascular System");

P("Rheumatic Heart Disease","Tier 2","SAQ/SN",
"Discuss etiopathogenesis and extracardiac lesions of rheumatic heart disease.",
"Paper II","Cardiovascular System");

P("Rheumatic vs Bacterial Endocarditis","Tier 2","SAQ/SN",
"Compare rheumatic and bacterial endocarditis.",
"Paper II","Cardiovascular System");

P("Hypertensive Heart Disease","Tier 2","SAQ/SN",
"Discuss hypertensive heart disease.",
"Paper II","Cardiovascular System");

P("Lung Carcinoma","Tier 1","LAQ",
"Discuss WHO classification, etiopathogenesis and morphology of lung carcinoma, including small-cell carcinoma.",
"Paper II","Respiratory System");

P("Lobar Pneumonia","Tier 1","LAQ",
"Discuss etiopathogenesis, stages, gross and microscopic features and complications of lobar pneumonia.",
"Paper II","Respiratory System");

P("Emphysema","Tier 2","SAQ/SN",
"Discuss pathogenesis and morphology of emphysema.",
"Paper II","Respiratory System");

P("Bronchiectasis","Tier 2","SAQ/SN",
"Discuss morphology and complications of bronchiectasis.",
"Paper II","Respiratory System");

P("Lung Abscess","Tier 2","SAQ/SN",
"Discuss etiology and morphology of lung abscess.",
"Paper II","Respiratory System");

P("Gastric Carcinoma","Tier 1","LAQ",
"Discuss etiopathogenesis, gross morphology and microscopic features of gastric carcinoma.",
"Paper II","Gastrointestinal Tract");

P("Colorectal Carcinoma","Tier 1","LAQ",
"Discuss colon carcinoma including etiology, gross and microscopic findings and spread. Add important features of rectal carcinoma.",
"Paper II","Gastrointestinal Tract");

P("Ulcerative Colitis","Tier 1","LAQ",
"Discuss ulcerative colitis with gross and microscopic features.",
"Paper II","Gastrointestinal Tract");

P("Crohn vs UC","Tier 2","SAQ/SN",
"Compare Crohn disease and ulcerative colitis.",
"Paper II","Gastrointestinal Tract");

P("H. pylori Gastritis","Tier 2","SAQ/SN",
"Discuss H. pylori gastritis.",
"Paper II","Gastrointestinal Tract");

P("Chronic Peptic Ulcer","Tier 2","SAQ/SN",
"Discuss chronic peptic ulcer.",
"Paper II","Gastrointestinal Tract");

P("Gastric Ulcer","Tier 2","SAQ/SN",
"Differentiate benign and malignant gastric ulcer.",
"Paper II","Gastrointestinal Tract");

P("Typhoid vs Tubercular Ulcer","Tier 2","SAQ/SN",
"Compare typhoid and tubercular intestinal ulcers.",
"Paper II","Gastrointestinal Tract");

P("Jaundice","Tier 1","LAQ",
"Define and classify jaundice. Discuss causes, laboratory diagnosis of obstructive jaundice and laboratory approach to jaundice.",
"Paper II","Liver");

P("Alcoholic Liver Disease","Tier 1","LAQ",
"Discuss pathogenesis, morphology, histology and complications of alcoholic liver disease. Define and classify cirrhosis.",
"Paper II","Liver");

P("Acute Viral Hepatitis","Tier 2","SAQ/SN",
"Discuss morphology of acute viral hepatitis.",
"Paper II","Liver");

P("HBV Serological Markers","Tier 2","SAQ/SN",
"Discuss HBV serological markers.",
"Paper II","Liver");

P("Fatty Liver","Tier 2","SAQ/SN",
"Discuss fatty liver.",
"Paper II","Liver");

P("Amoebic Liver Abscess","Tier 2","SAQ/SN",
"Discuss amoebic liver abscess.",
"Paper II","Liver");

P("Hepatocellular Carcinoma","Tier 2","SAQ/SN",
"Discuss hepatocellular carcinoma.",
"Paper II","Liver");

P("Glomerular Diseases","Tier 1","LAQ",
"Classify glomerulonephritis. Discuss rapidly progressive glomerulonephritis including types and gross/microscopic morphology.",
"Paper II","Kidney");

P("Post-Streptococcal GN","Tier 1","SAQ/SN",
"Discuss etiopathogenesis, morphology and clinical course of post-streptococcal glomerulonephritis.",
"Paper II","Kidney");

P("Glomerular Syndromes","Tier 2","SAQ/SN",
"Discuss glomerular syndromes.",
"Paper II","Kidney");

P("Membranous Glomerulopathy","Tier 2","SAQ/SN",
"Discuss membranous glomerulopathy.",
"Paper II","Kidney");

P("Nephrotic Syndrome","Tier 2","SAQ/SN",
"Discuss nephrotic syndrome.",
"Paper II","Kidney");

P("Chronic Pyelonephritis","Tier 2","SAQ/SN",
"Discuss chronic pyelonephritis.",
"Paper II","Kidney");

P("Renal Cell Carcinoma","Tier 2","SAQ/SN",
"Discuss renal cell carcinoma.",
"Paper II","Kidney");

P("Seminoma","Tier 1","SAQ/SN",
"Discuss gross morphology, microscopic morphology, labelled diagram and modes of spread of seminoma.",
"Paper II","Male Reproductive System");

P("Testicular Tumours","Tier 2","SAQ/SN",
"Classify testicular tumours.",
"Paper II","Male Reproductive System");

P("Teratoma","Tier 2","SAQ/SN",
"Discuss teratoma.",
"Paper II","Male Reproductive System");

P("Fibroid Uterus","Tier 1","SAQ/SN",
"Discuss gross and microscopic features and complications of fibroid uterus.",
"Paper II","Female Genital Tract");

P("Ovarian Germ Cell Tumours","Tier 1","SAQ/SN",
"Discuss ovarian germ cell tumours.",
"Paper II","Female Genital Tract");

P("Dysgerminoma","Tier 1","SAQ/SN",
"Discuss morphology of dysgerminoma.",
"Paper II","Female Genital Tract");

P("Teratoma","Tier 2","SAQ/SN",
"Classify teratoma and discuss extragonadal sites.",
"Paper II","Female Genital Tract");

P("Breast Carcinoma","Tier 1","LAQ",
"Discuss classification, grading, staging, prognostic factors, risk factors and invasive ductal carcinoma of breast.",
"Paper II","Breast");

P("Fibroadenoma","Tier 1","SAQ/SN",
"Discuss gross and microscopic features of fibroadenoma.",
"Paper II","Breast");

P("Breast Tumours","Tier 2","SAQ/SN",
"Classify breast tumours and discuss prognostic and predictive factors.",
"Paper II","Breast");

P("Squamous Cell Carcinoma","Tier 2","SAQ/SN",
"Discuss pathogenesis and morphology of squamous cell carcinoma.",
"Paper II","Skin");

P("Melanoma","Tier 2","SAQ/SN",
"Discuss melanoma.",
"Paper II","Skin");

P("Diabetes Mellitus","Tier 1","LAQ",
"Discuss diagnostic criteria, classification, laboratory investigations and significance of investigations in diabetes mellitus. Explain diabetic nephropathy/glomerulosclerosis pathogenesis and morphology.",
"Paper II","Endocrine System");

P("Oral GTT","Tier 1","SAQ/SN",
"Discuss indications, method and interpretation of oral glucose tolerance test.",
"Paper II","Endocrine System");

P("Glycosylated Haemoglobin","Tier 2","SAQ/SN",
"Discuss glycosylated haemoglobin.",
"Paper II","Endocrine System");

P("Thyroid Tumours","Tier 2","SAQ/SN",
"Discuss thyroid tumours.",
"Paper II","Endocrine System");

P("Colloid Goitre","Tier 2","SAQ/SN",
"Discuss colloid goitre.",
"Paper II","Endocrine System");

P("Hashimoto Thyroiditis","Tier 2","SAQ/SN",
"Discuss Hashimoto thyroiditis.",
"Paper II","Endocrine System");

P("MEN Syndromes","Tier 2","SAQ/SN",
"Discuss MEN syndromes.",
"Paper II","Endocrine System");

P("Osteosarcoma","Tier 1","SAQ/SN",
"Classify primary bone tumours. Discuss morphology, clinical course and radiological findings of osteosarcoma.",
"Paper II","Musculoskeletal System");

P("Osteomyelitis","Tier 2","SAQ/SN",
"Discuss osteomyelitis.",
"Paper II","Musculoskeletal System");

P("Rheumatoid Arthritis","Tier 2","SAQ/SN",
"Discuss rheumatoid arthritis.",
"Paper II","Musculoskeletal System");

P("Meningitis","Tier 1","LAQ",
"Discuss pyogenic meningitis including etiology and CSF findings. Compare with tuberculous meningitis.",
"Paper II","Nervous System");

P("CSF Findings","Tier 2","SAQ/SN",
"Compare CSF findings in pyogenic, TB and viral meningitis.",
"Paper II","Nervous System");

P("Meningioma","Tier 2","SAQ/SN",
"Discuss gross and microscopic features of meningioma.",
"Paper II","Nervous System");

P("Hodgkin Lymphoma","Tier 1","SAQ/SN",
"Discuss classification of Hodgkin lymphoma, Reed-Sternberg cells and variants, mixed cellularity type and gross/microscopic features.",
"Paper II","Lymphomas");

P("Non-Hodgkin Lymphoma","Tier 2","SAQ/SN",
"Discuss classification of non-Hodgkin lymphoma.",
"Paper II","Lymphomas");

P("Splenomegaly","Tier 2","SAQ/SN",
"Discuss causes and classification of splenomegaly.",
"Paper II","Lymphomas");


/* ============================================================
   MICROBIOLOGY
   ============================================================ */

function M(topic,tier,type,question,paper="Paper I",section="General Microbiology"){
    addQ("Microbiology",paper,section,topic,tier,type,question);
}

M("Koch","Tier 1","SAQ/SN",
"Discuss contributions of Robert Koch and Koch's postulates.");

M("Prokaryotes vs Eukaryotes","Tier 2","SAQ/SN",
"Compare prokaryotes and eukaryotes.");

M("Louis Pasteur","Tier 2","SAQ/SN",
"Discuss contributions of Louis Pasteur.");

M("Bacterial Cell Wall","Tier 1","LAQ",
"Discuss structure and functions of the bacterial cell wall.");

M("Bacterial Growth Curve","Tier 2","SAQ/SN",
"Discuss bacterial growth curve with diagram.");

M("Bacterial Capsule","Tier 2","SAQ/SN",
"Discuss bacterial capsule.");

M("Bacterial Flagella","Tier 2","SAQ/SN",
"Discuss types and demonstration of bacterial flagella.");

M("Bacterial Spores","Tier 2","SAQ/SN",
"Discuss bacterial spores.");

M("Microscopes","Tier 2","SAQ/SN",
"Discuss types of microscopes.");

M("Dark-ground Microscopy","Tier 2","SAQ/SN",
"Discuss dark-ground microscopy.");

M("Autoclave","Tier 1","LAQ",
"Discuss sterilization and disinfection definitions and methods. Explain moist heat sterilization and autoclave principle, types, working, applications, complications and labelled diagram. Mention items sterilized in autoclave.");

M("Hot Air Oven","Tier 1","SAQ/SN",
"Discuss dry heat sterilization and hot air oven.");

M("Chemical Disinfectants","Tier 2","SAQ/SN",
"Discuss chemical disinfectants.");

M("Ideal Disinfectant","Tier 2","SAQ/SN",
"Discuss properties of an ideal disinfectant.");

M("Gaseous Disinfectants","Tier 2","SAQ/SN",
"Discuss gaseous disinfectants.");

M("Tyndallization","Tier 2","SAQ/SN",
"Discuss tyndallization.");

M("Culture Media","Tier 2","SAQ/SN",
"Classify culture media with examples.");

M("Enriched vs Enrichment Media","Tier 2","SAQ/SN",
"Compare enriched and enrichment media.");

M("Selective Media","Tier 2","SAQ/SN",
"Discuss selective media.");

M("Solid Media Without Agar","Tier 2","SAQ/SN",
"Give examples of solid media without agar.");

M("Bacterial Gene Transfer","Tier 1","LAQ",
"Discuss gene transfer in bacteria. Explain transformation, transduction and conjugation and describe any one method in detail.");

M("Mutation","Tier 2","SAQ/SN",
"Discuss mutation.");

M("Plasmid Drug Resistance","Tier 2","SAQ/SN",
"Discuss plasmid-mediated drug resistance.");

M("Mutational vs Plasmid Resistance","Tier 2","SAQ/SN",
"Compare mutational and plasmid-mediated resistance.");


/* BACTERIOLOGY */

M("Streptococcus pyogenes","Tier 1","SAQ/SN",
"Discuss infections caused by Streptococcus pyogenes and non-suppurative sequelae.",
"Paper I","Bacteriology");

M("S. pneumoniae vs Viridans","Tier 1","SAQ/SN",
"Compare Streptococcus pneumoniae and viridans streptococci.",
"Paper I","Bacteriology");

M("Gas Gangrene","Tier 1","LAQ",
"Discuss pathogenesis and laboratory diagnosis of gas gangrene.",
"Paper I","Bacteriology");

M("Tetanus","Tier 1","SAQ/SN",
"Discuss immunoprophylaxis of tetanus.",
"Paper I","Bacteriology");

M("Clostridium botulinum","Tier 1","SAQ/SN",
"Discuss pathogenicity and prevention of Clostridium botulinum.",
"Paper I","Bacteriology");

M("Nagler Reaction","Tier 1","SAQ/SN",
"Discuss Nagler reaction.",
"Paper I","Bacteriology");

M("Enteric Fever","Tier 1","LAQ",
"Discuss pathogenesis and laboratory diagnosis of enteric fever. Explain Widal test, diagnosis during the first week and Salmonella species and diseases.",
"Paper I","Bacteriology");

M("Vibrio cholerae","Tier 1","LAQ",
"Discuss pathogenesis and laboratory diagnosis of Vibrio cholerae. Compare classical and El Tor vibrios and explain Gardner-Venkataraman classification, halophilic vibrios and Kanagawa phenomenon.",
"Paper I","Bacteriology");

M("Chlamydia","Tier 1","LAQ",
"Classify Chlamydia. Discuss infections, pathogenesis, complications and laboratory diagnosis.",
"Paper I","Bacteriology");

M("Mycobacterium tuberculosis","Tier 1","LAQ",
"Discuss morphology, cultural characteristics, pathogenesis, laboratory diagnosis and recent advances in diagnosis of Mycobacterium tuberculosis.",
"Paper I","Bacteriology");

M("Syphilis","Tier 1","LAQ",
"Discuss classification of spirochetes and laboratory diagnosis of syphilis. Compare treponemal and non-treponemal tests and discuss VDRL principle, applications, advantages and limitations.",
"Paper I","Bacteriology");

M("Leptospirosis","Tier 1","LAQ",
"Discuss pathogenesis and diagnosis of leptospirosis.",
"Paper I","Bacteriology");

M("Diphtheria","Tier 1","SAQ/SN",
"Discuss pathogenicity, laboratory diagnosis, toxigenicity testing and metachromatic granules of Corynebacterium diphtheriae.",
"Paper I","Bacteriology");

M("Meningococcal Meningitis","Tier 1","SAQ/SN",
"Discuss laboratory diagnosis of meningococcal meningitis.",
"Paper I","Bacteriology");

M("Gonorrhoea","Tier 1","SAQ/SN",
"Discuss morphology, cultural characteristics, pathogenicity and diagnosis of gonorrhoea.",
"Paper I","Bacteriology");

M("Haemophilus influenzae","Tier 2","SAQ/SN",
"Explain X and V factors, satellitism and lesions caused by H. influenzae.",
"Paper I","Bacteriology");

M("Diarrhoeagenic E. coli","Tier 2","SAQ/SN",
"Discuss diarrhoeagenic E. coli types.",
"Paper I","Bacteriology");

M("ETEC","Tier 2","SAQ/SN",
"Discuss enterotoxigenic E. coli and laboratory diagnosis.",
"Paper I","Bacteriology");

M("Shigella","Tier 2","SAQ/SN",
"Classify Shigella. Discuss pathogenesis of dysentery and laboratory diagnosis.",
"Paper I","Bacteriology");

M("Leprosy","Tier 2","SAQ/SN",
"Discuss M. leprae morphology, tuberculoid versus lepromatous leprosy and lepromin test.",
"Paper I","Bacteriology");


/* CLINICAL */

M("Urinary Tract Infection","Tier 1","LAQ",
"Discuss organisms causing UTI, laboratory diagnosis and definition of significant bacteriuria.",
"Paper I","Clinical Microbiology");

M("Meningitis","Tier 1","LAQ",
"Discuss organisms causing meningitis and laboratory diagnosis of pyogenic meningitis, including meningococcal meningitis.",
"Paper I","Clinical Microbiology");

M("PUO","Tier 1","LAQ",
"Define pyrexia of unknown origin. Discuss infectious causes, approach to diagnosis and bacteria causing PUO.",
"Paper I","Clinical Microbiology");

M("Hospital-Acquired Infections","Tier 1","SAQ/SN",
"Define HAI. Discuss causative organisms and prevention/control.",
"Paper I","Clinical Microbiology");

M("Lower Respiratory Tract Infection","Tier 2","SAQ/SN",
"Discuss bacterial causes of lower respiratory tract infections.",
"Paper I","Clinical Microbiology");

M("Sexually Transmitted Infections","Tier 2","SAQ/SN",
"Discuss causative organisms of sexually transmitted infections.",
"Paper I","Clinical Microbiology");

M("Bacterial Food Poisoning","Tier 2","SAQ/SN",
"Discuss bacterial food poisoning.");

M("Blood Culture","Tier 2","SAQ/SN",
"Discuss blood culture.");

M("Universal Safety Precautions","Tier 2","SAQ/SN",
"Discuss universal safety precautions.");


/* PAPER II */

M("Immunoglobulins","Tier 1","LAQ",
"Define antibodies. Discuss classes and subclasses. Explain IgG structure and functions and IgM structure, properties and functions.",
"Paper II","Immunology");

M("IgA","Tier 2","SAQ/SN",
"Discuss structure of IgA.",
"Paper II","Immunology");

M("Antibody Classification","Tier 2","SAQ/SN",
"Discuss antibody classification.",
"Paper II","Immunology");

M("Antigen-Antibody Reactions","Tier 1","LAQ",
"Classify antigen-antibody reactions. Explain agglutination and precipitation principles, types and applications and the prozone phenomenon.",
"Paper II","Immunology");

M("Agglutination vs Precipitation","Tier 2","SAQ/SN",
"Compare agglutination and precipitation.",
"Paper II","Immunology");

M("Widal Test","Tier 2","SAQ/SN",
"Discuss Widal test.",
"Paper II","Immunology");

M("Passive Agglutination","Tier 2","SAQ/SN",
"Discuss passive agglutination.",
"Paper II","Immunology");

M("ELISA","Tier 2","SAQ/SN",
"Discuss ELISA and its applications.",
"Paper II","Immunology");

M("Complement","Tier 2","SAQ/SN",
"Discuss classical complement pathway, complement cascade and biological effects.",
"Paper II","Immunology");

M("Hypersensitivity","Tier 1","LAQ",
"Define and classify hypersensitivity. Discuss type I hypersensitivity, immediate hypersensitivity and type IV hypersensitivity mechanisms.",
"Paper II","Immunology");

M("Type III Hypersensitivity","Tier 2","SAQ/SN",
"Discuss type III hypersensitivity.",
"Paper II","Immunology");

M("Anaphylaxis","Tier 2","SAQ/SN",
"Discuss anaphylaxis.",
"Paper II","Immunology");

M("Autoimmunity","Tier 2","SAQ/SN",
"Define autoimmunity. Discuss mechanisms and features of autoimmune diseases.",
"Paper II","Immunology");

M("HIV","Tier 1","LAQ",
"Discuss etiology, window period, pathogenesis, laboratory diagnosis, diagram, opportunistic infections and HIV testing strategies in India.",
"Paper II","Virology");

M("Hepatitis B","Tier 1","LAQ",
"Discuss classification of hepatitis viruses, HBV pathogenesis, laboratory diagnosis, serological markers, transmission and prophylaxis.",
"Paper II","Virology");

M("Influenza","Tier 1","LAQ",
"Discuss morphology, classification, antigenic variation, antigenic shift, pathogenesis and significance of influenza.",
"Paper II","Virology");

M("Herpes Viruses","Tier 2","SAQ/SN",
"Classify Herpesviridae and discuss varicella-zoster clinical features and diagnosis and HSV lesions and diagnosis.",
"Paper II","Virology");

M("Polio","Tier 2","SAQ/SN",
"Discuss pathogenicity, laboratory diagnosis and immunoprophylaxis of polio.",
"Paper II","Virology");

M("Embryonated Egg","Tier 2","SAQ/SN",
"Discuss routes of inoculation and uses of embryonated egg.",
"Paper II","Virology");

M("Viral Culture","Tier 2","SAQ/SN",
"Discuss viral culture.");

M("Viral Growth Detection","Tier 2","SAQ/SN",
"Discuss methods of detecting viral growth.");

M("Viral Multiplication","Tier 2","SAQ/SN",
"Discuss viral multiplication.");

M("Inclusion Bodies","Tier 2","SAQ/SN",
"Discuss inclusion bodies.");

M("Negri Bodies","Tier 2","SAQ/SN",
"Discuss Negri bodies.");

M("Oncogenic Viruses","Tier 2","SAQ/SN",
"Discuss oncogenic viruses.");

M("EBV","Tier 2","SAQ/SN",
"Discuss Epstein-Barr virus.");

M("Influenza and HIV Diagrams","Tier 2","SAQ/SN",
"Draw and label important diagrams of influenza and HIV.");

M("Salk vs Sabin","Tier 2","SAQ/SN",
"Compare Salk and Sabin vaccines.");


/* MYCOLOGY */

M("Dermatophytes","Tier 1","LAQ",
"Classify dermatophytes. Discuss pathogenicity, clinical presentation and laboratory diagnosis.",
"Paper II","Mycology");

M("Opportunistic Mycoses","Tier 1","SAQ/SN",
"Discuss fungi causing opportunistic infections. Include candidiasis laboratory diagnosis, aspergillosis and cryptococcal meningitis laboratory diagnosis.",
"Paper II","Mycology");

M("Candida albicans","Tier 2","SAQ/SN",
"Discuss Candida albicans.",
"Paper II","Mycology");

M("Histoplasma capsulatum","Tier 2","SAQ/SN",
"Discuss Histoplasma capsulatum.",
"Paper II","Mycology");

M("Mycetoma","Tier 2","SAQ/SN",
"Discuss mycetoma and eumycetoma.",
"Paper II","Mycology");

M("Morphological Classification of Fungi","Tier 2","SAQ/SN",
"Discuss morphological classification of fungi.",
"Paper II","Mycology");


/* PARASITOLOGY */

M("Leishmania donovani","Tier 1","LAQ",
"Discuss life cycle, kala-azar, pathogenicity and laboratory diagnosis of Leishmania donovani.",
"Paper II","Parasitology");

M("Malignant Tertian Malaria","Tier 1","LAQ",
"Discuss malignant tertian malaria, P. falciparum complications and diagnosis and P. vivax morphology, life cycle and diagnosis.",
"Paper II","Parasitology");

M("Ascariasis","Tier 1","LAQ",
"Discuss Ascaris lumbricoides morphology, life cycle, pathogenicity, complications and laboratory diagnosis.",
"Paper II","Parasitology");

M("Hookworm","Tier 1","LAQ",
"Discuss Ancylostoma duodenale morphology, life cycle, pathogenicity and laboratory diagnosis. Mention parasites causing anaemia.",
"Paper II","Parasitology");

M("Cestodes","Tier 1","LAQ",
"Classify cestodes. Discuss Taenia solium morphology, life cycle, pathogenesis and diagnosis and cysticercosis pathogenesis.",
"Paper II","Parasitology");

M("Hydatid Cyst","Tier 2","SAQ/SN",
"Discuss hydatid cyst and life cycle of Echinococcus granulosus.",
"Paper II","Parasitology");

M("Taenia solium vs Taenia saginata","Tier 2","SAQ/SN",
"Compare Taenia solium and Taenia saginata.",
"Paper II","Parasitology");

M("Enterobius vermicularis","Tier 2","SAQ/SN",
"Discuss Enterobius vermicularis.",
"Paper II","Parasitology");

M("Strongyloides Hyperinfection","Tier 2","SAQ/SN",
"Discuss Strongyloides stercoralis hyperinfection.",
"Paper II","Parasitology");

M("Wuchereria bancrofti","Tier 2","SAQ/SN",
"Discuss Wuchereria bancrofti.",
"Paper II","Parasitology");

M("Filariasis","Tier 2","SAQ/SN",
"Discuss filariasis.",
"Paper II","Parasitology");

M("Ectopic Ascariasis","Tier 2","SAQ/SN",
"Discuss ectopic ascariasis.",
"Paper II","Parasitology");

M("Guinea Worm","Tier 2","SAQ/SN",
"Discuss guinea worm disease.",
"Paper II","Parasitology");

M("Stool Concentration Methods","Tier 2","SAQ/SN",
"Discuss stool concentration methods.",
"Paper II","Parasitology");


/* ============================================================
   FORENSIC MEDICINE
   ============================================================ */

function F(topic,tier,type,question,section="Forensic Medicine",paper="Paper I"){
    addQ("Forensic Medicine & Toxicology",paper,section,topic,tier,type,question);
}

F("Inquest","Tier 2","SAQ/SN",
"Define inquest. Discuss types of inquest in India and the Medical Examiner system.","Legal Procedures");

F("Subpoena","Tier 2","SAQ/SN",
"Discuss subpoena.","Legal Procedures");

F("Cross Examination","Tier 2","SAQ/SN",
"Discuss cross-examination.","Legal Procedures");

F("Medical Evidence","Tier 1","LAQ",
"Define medical evidence and classify its types. Discuss documentary evidence.","Medical Evidence");

F("Dying Declaration","Tier 1","SAQ/SN",
"Discuss dying declaration.","Medical Evidence");

F("Medical Negligence","Tier 1","LAQ",
"Define negligence. Differentiate civil and criminal negligence. Discuss essential elements and defences available to medical practitioners.","Medical Jurisprudence");

F("Consent","Tier 1","LAQ",
"Define consent. Discuss types and doctrine of informed consent.","Medical Jurisprudence");

F("Privileged Communication","Tier 2","SAQ/SN",
"Discuss privileged communication.","Medical Jurisprudence");

F("Professional Misconduct","Tier 2","SAQ/SN",
"Discuss professional misconduct and infamous conduct.","Medical Jurisprudence");

F("Duties of Registered Medical Practitioner","Tier 2","SAQ/SN",
"Discuss duties of a registered medical practitioner.","Medical Jurisprudence");

F("Res Ipsa Loquitur","Tier 2","SAQ/SN",
"Discuss res ipsa loquitur.","Medical Jurisprudence");

F("Vicarious Liability","Tier 2","SAQ/SN",
"Discuss vicarious liability.","Medical Jurisprudence");

F("Euthanasia","Tier 2","SAQ/SN",
"Discuss euthanasia.","Medical Jurisprudence");

F("DNA Testing","Tier 1","LAQ",
"Discuss indications for DNA testing, materials used and DNA typing procedure.","Identification");

F("Forensic DNA Fingerprinting","Tier 2","SAQ/SN",
"Discuss forensic DNA fingerprinting.","Identification");

F("Gustafson Method","Tier 2","SAQ/SN",
"Discuss Gustafson's method.","Identification");

F("Anthropometry","Tier 2","SAQ/SN",
"Discuss anthropometry.","Identification");

F("Time Since Death","Tier 1","LAQ",
"Discuss parameters used to estimate time since death.","Thanatology");

F("Rigor Mortis","Tier 1","SAQ/SN",
"Discuss rigor mortis, factors affecting it and medicolegal importance.","Thanatology");

F("Postmortem Cooling","Tier 2","SAQ/SN",
"Discuss postmortem cooling.","Thanatology");

F("Cadaveric Spasm","Tier 2","SAQ/SN",
"Discuss cadaveric spasm.","Thanatology");

F("Brainstem Death","Tier 2","SAQ/SN",
"Discuss brainstem death.","Thanatology");

F("Early Signs of Death","Tier 2","SAQ/SN",
"Discuss early signs of death.","Thanatology");

F("Late Signs of Death","Tier 2","SAQ/SN",
"Discuss late signs of death.","Thanatology");

F("Adipocere","Tier 2","SAQ/SN",
"Discuss adipocere.","Thanatology");

F("Eye Changes After Death","Tier 2","SAQ/SN",
"Discuss eye changes after death.","Thanatology");

F("Suspended Animation","Tier 2","SAQ/SN",
"Discuss suspended animation.","Thanatology");

F("Hanging","Tier 1","LAQ",
"Define and classify hanging. Discuss complete typical hanging, postmortem findings of face and neck, types of hanging and ligature mark.","Hanging / Strangulation / Asphyxia");

F("Strangulation","Tier 1","LAQ",
"Define and classify strangulation. Discuss throttling and ligature strangulation postmortem findings.","Hanging / Strangulation / Asphyxia");

F("Drowning","Tier 1","LAQ",
"Discuss types of drowning, postmortem findings and medicolegal importance.","Hanging / Strangulation / Asphyxia");

F("Choking","Tier 2","SAQ/SN",
"Discuss choking.","Hanging / Strangulation / Asphyxia");

F("Garroting","Tier 2","SAQ/SN",
"Discuss garroting.","Hanging / Strangulation / Asphyxia");

F("Sexual Asphyxia","Tier 2","SAQ/SN",
"Discuss sexual asphyxia.","Hanging / Strangulation / Asphyxia");

F("Mechanical Injuries","Tier 1","LAQ",
"Classify mechanical injuries. Discuss stab wounds and contusions with medicolegal importance.","Mechanical Injuries");

F("Firearm Entry vs Exit","Tier 1","SAQ/SN",
"Compare firearm entry and exit wounds.","Mechanical Injuries");

F("Firearm Entry Wound","Tier 1","SAQ/SN",
"Describe features of firearm entry wound at different ranges.","Mechanical Injuries");

F("Shotgun Cartridge","Tier 1","SAQ/SN",
"Draw and label a shotgun cartridge.","Mechanical Injuries");

F("Ricochet Bullet","Tier 1","SAQ/SN",
"Discuss ricochet bullet.","Mechanical Injuries");

F("Smooth-Bore Ammunition","Tier 1","SAQ/SN",
"Discuss ammunition used in smooth-bore guns.","Mechanical Injuries");

F("Incised vs Laceration","Tier 2","SAQ/SN",
"Compare incised wound and laceration.","Mechanical Injuries");

F("Cut Throat","Tier 2","SAQ/SN",
"Differentiate suicidal and homicidal cut throat.","Mechanical Injuries");

F("Bomb Blast Injuries","Tier 2","SAQ/SN",
"Discuss bomb blast injuries.","Mechanical Injuries");

F("Burns","Tier 1","LAQ",
"Define and classify burns. Compare antemortem and postmortem burns. Discuss causes of death and medicolegal aspects.","Burns / Thermal Injuries");

F("Lightning Injury","Tier 2","SAQ/SN",
"Discuss mechanism and autopsy findings of lightning injury.","Burns / Thermal Injuries");

F("Skull Fractures","Tier 1","LAQ",
"Discuss types and mechanisms of skull fractures and estimation of age of fracture.","Skull / Head Injury");

F("Head Injury","Tier 1","LAQ",
"Discuss head injury and intracranial injuries.","Skull / Head Injury");

F("Sexual Assault Examination","Tier 1","LAQ",
"Discuss amended Section 375 IPC and evidence collection in sexual assault/rape examination.","Sexual Offences / Obstetric Forensics");

F("Live Birth","Tier 1","SAQ/SN",
"Discuss signs of live birth.","Sexual Offences / Obstetric Forensics");

F("Hydrostatic Test","Tier 1","SAQ/SN",
"Discuss hydrostatic test.","Sexual Offences / Obstetric Forensics");

F("Consent in Sexual Assault Examination","Tier 2","SAQ/SN",
"Discuss consent in examination of sexual assault victim.","Sexual Offences / Obstetric Forensics");

F("Pregnancy Signs","Tier 2","SAQ/SN",
"Discuss probable signs of pregnancy.","Sexual Offences / Obstetric Forensics");

F("Pseudocyesis","Tier 2","SAQ/SN",
"Discuss pseudocyesis.","Sexual Offences / Obstetric Forensics");

F("Parous vs Nulliparous Uterus","Tier 2","SAQ/SN",
"Compare parous and nulliparous uterus.","Sexual Offences / Obstetric Forensics");

F("MTP Act","Tier 2","SAQ/SN",
"Discuss MTP Act.","Sexual Offences / Obstetric Forensics");

F("Battered Baby Syndrome","Tier 2","SAQ/SN",
"Discuss battered baby syndrome.","Sexual Offences / Obstetric Forensics");

F("Sudden Infant Death Syndrome","Tier 2","SAQ/SN",
"Discuss sudden infant death syndrome.","Sexual Offences / Obstetric Forensics");

F("Impotence and Sterility","Tier 2","SAQ/SN",
"Discuss impotence and sterility.","Sexual Offences / Obstetric Forensics");

F("Artificial Insemination","Tier 2","SAQ/SN",
"Discuss artificial insemination.","Sexual Offences / Obstetric Forensics");

F("Insanity and Murder","Tier 1","LAQ",
"Discuss insanity and murder.","Forensic Psychiatry");

F("Personality Disorders","Tier 1","LAQ",
"Discuss personality disorders.","Forensic Psychiatry");

F("Civil Responsibilities","Tier 1","LAQ",
"Discuss civil responsibilities of mentally ill persons.","Forensic Psychiatry");

F("Testamentary Capacity","Tier 2","SAQ/SN",
"Discuss testamentary capacity.","Forensic Psychiatry");

F("Delusion","Tier 2","SAQ/SN",
"Define delusion and classify its types.","Forensic Psychiatry");

F("True vs Feigned Insanity","Tier 2","SAQ/SN",
"Differentiate true and feigned insanity.","Forensic Psychiatry");

F("McNaughten Rule","Tier 2","SAQ/SN",
"Discuss McNaughten rule.","Forensic Psychiatry");

F("Exhumation","Tier 2","SAQ/SN",
"Discuss exhumation.","Other Forensic Topics");

F("Postmortem Artefacts","Tier 2","SAQ/SN",
"Discuss postmortem artefacts.","Other Forensic Topics");

F("Preservation of Viscera","Tier 2","SAQ/SN",
"Discuss preservation of viscera.","Other Forensic Topics");

F("Negative Viscera Report","Tier 2","SAQ/SN",
"Discuss negative viscera report.","Other Forensic Topics");

F("Hyoid Bone","Tier 2","SAQ/SN",
"Discuss medicolegal importance of hyoid bone.","Other Forensic Topics");

F("Radiography of Dead Body","Tier 2","SAQ/SN",
"Discuss radiography of dead body.","Other Forensic Topics");

F("Ideal Identification Mark","Tier 2","SAQ/SN",
"Discuss ideal identification mark.","Other Forensic Topics");

F("Civil Negligence Redressal","Tier 2","SAQ/SN",
"Discuss redressal mechanisms for civil negligence.","Other Forensic Topics");


/* TOXICOLOGY */

F("Duties of Doctor in Poisoning","Tier 1","LAQ",
"Discuss duties of doctor in poisoning cases, classification of poisons and factors modifying action of poisons.","Toxicology");

F("Antidotes","Tier 2","SAQ/SN",
"Discuss antidotes.","Toxicology");

F("Chelating Agents","Tier 2","SAQ/SN",
"Discuss chelating agents.","Toxicology");

F("General Management of Poisoning","Tier 2","SAQ/SN",
"Discuss general principles of management of poisoning.","Toxicology");

F("Mineral Acid Poisoning","Tier 2","SAQ/SN",
"Discuss postmortem stomach findings in mineral acid poisoning.","Corrosives");

F("Corrosive Poisons","Tier 2","SAQ/SN",
"Classify corrosive poisons.","Corrosives");

F("Vitriolage","Tier 2","SAQ/SN",
"Discuss vitriolage.","Corrosives");

F("Carbolism and Carboluria","Tier 2","SAQ/SN",
"Discuss carbolism and carboluria.","Corrosives");

F("Oxalic Acid Poisoning","Tier 2","SAQ/SN",
"Discuss oxalic acid poisoning.","Corrosives");

F("Lead Poisoning","Tier 1","LAQ",
"Discuss chronic lead poisoning including sources, clinical features and management.","Lead Poisoning");

F("Snakebite","Tier 1","LAQ",
"Discuss venomous versus non-venomous snakes, identification of poisonous snakes, cobra bite clinical features and treatment, viper bite features, management of poisonous snakebite and medicolegal aspects.","Snakebite");

F("Aluminium Phosphide","Tier 1","LAQ",
"Discuss clinical features, treatment, postmortem appearances and medicolegal aspects of aluminium phosphide poisoning.","Aluminium Phosphide");

F("Drunkenness","Tier 1","LAQ",
"Define drunkenness and discuss medicolegal aspects.","Alcohol / Methanol");

F("Methanol Poisoning","Tier 1","LAQ",
"Discuss symptoms and treatment of methanol poisoning.","Alcohol / Methanol");

F("Ethyl Alcohol Poisoning","Tier 2","SAQ/SN",
"Discuss symptoms and postmortem findings of ethyl alcohol poisoning.","Alcohol / Methanol");

F("Stages of Alcohol Intoxication","Tier 2","SAQ/SN",
"Discuss stages of alcohol intoxication.","Alcohol / Methanol");

F("Opium Poisoning","Tier 1","LAQ",
"Discuss clinical features, treatment, medicolegal importance, postmortem findings and differential diagnosis of opium poisoning.","Opium");

F("Strychnine Poisoning","Tier 1","LAQ",
"Discuss signs and symptoms of strychnine poisoning and differentiate it from tetanus.","Strychnine");

F("Barbiturate Poisoning","Tier 1","LAQ",
"Discuss symptoms, signs, treatment and medicolegal aspects of barbiturate poisoning.","Barbiturate Poisoning");

F("Organophosphorus Poisoning","Tier 1","LAQ",
"Discuss clinical features, treatment and postmortem findings of organophosphorus poisoning.","Organophosphorus Poisoning");

F("Hallucinogens","Tier 2","SAQ/SN",
"Discuss hallucinogenic agents and give examples.","Hallucinogens / Cocaine");

F("Cocainism","Tier 2","SAQ/SN",
"Discuss cocainism and medicolegal importance.","Hallucinogens / Cocaine");

F("Organochlorine Poisoning","Tier 2","SAQ/SN",
"Discuss organochlorine poisoning.","Hallucinogens / Cocaine");


/* ============================================================
   ULTRA HIGH YIELD
   ============================================================ */

const ULTRA = {

    "Pharmacology":[
        "Antiepileptic drugs",
        "Antimalarial drugs / ACT",
        "Antitubercular drugs / MDR-TB",
        "Antihypertensive drugs",
        "Corticosteroids",
        "Oral hypoglycaemic drugs",
        "Insulin",
        "ACE inhibitors",
        "CHF treatment",
        "Adrenaline",
        "Beta blockers",
        "Anticholinesterases",
        "Organophosphate poisoning",
        "NSAIDs / Aspirin",
        "Antimicrobial selection",
        "Cephalosporins",
        "Penicillins",
        "Aminoglycosides",
        "Antipsychotics / antidepressants",
        "Opioids",
        "Peptic ulcer drugs",
        "Diuretics / Furosemide",
        "Iron preparations",
        "Statins",
        "Oxytocics",
        "Oral contraceptives"
    ],

    "Pathology":[
        "Necrosis",
        "Apoptosis",
        "Amyloidosis",
        "Oedema",
        "Thrombosis",
        "Embolism",
        "Acute inflammation",
        "Wound healing",
        "Neoplasia",
        "Metastasis",
        "Chemical carcinogenesis",
        "Anaemia",
        "Megaloblastic anaemia",
        "Leukemia",
        "Atherosclerosis",
        "Myocardial infarction",
        "Lung carcinoma",
        "Lobar pneumonia",
        "Gastric carcinoma",
        "Colorectal carcinoma",
        "Jaundice",
        "Alcoholic liver disease",
        "Glomerulonephritis",
        "Breast carcinoma",
        "Diabetes mellitus",
        "Meningitis",
        "Hodgkin lymphoma",
        "Osteosarcoma"
    ],

    "Microbiology":[
        "Sterilization / Autoclave",
        "Bacterial genetics / Gene transfer",
        "Tuberculosis",
        "Enteric fever",
        "Syphilis / Spirochetes",
        "Vibrio cholerae",
        "Chlamydia",
        "Clostridium",
        "Streptococcus",
        "UTI",
        "Meningitis",
        "PUO",
        "HIV",
        "Hepatitis B",
        "Influenza",
        "Antigen-antibody reactions",
        "Immunoglobulins",
        "Hypersensitivity",
        "Dermatophytes",
        "Opportunistic mycoses",
        "Malaria",
        "Leishmaniasis",
        "Ascariasis",
        "Hookworm",
        "Cestodes"
    ],

    "Forensic Medicine & Toxicology":[
        "Medical negligence",
        "Consent",
        "Dying declaration",
        "DNA fingerprinting",
        "Time since death",
        "Rigor mortis",
        "Hanging",
        "Strangulation",
        "Drowning",
        "Burns",
        "Skull fractures",
        "Firearm injuries",
        "Sexual assault examination",
        "Live birth / Hydrostatic test",
        "Snakebite",
        "Organophosphorus poisoning",
        "Opium poisoning",
        "Methanol poisoning",
        "Lead poisoning",
        "Aluminium phosphide poisoning",
        "Strychnine poisoning",
        "Barbiturate poisoning",
        "Duties of doctor in poisoning"
    ],

    "Anatomy":[
        "Scalp Layers, Blood Supply, nerve supply",
        "Parotid Gland",
        "Temporomandibular joint",
        "Cavernous sinus",
        "Extra-ocular muscles",
        "Nasal septum & Lateral wall of nose",
        "Mammary gland",
        "Shoulder Joint",
        "Cubital fossa",
        "Diaphragm - openings",
        "Arch of aorta & Thoracic duct",
        "Femoral Triangle / sheath",
        "Popliteal Fossa",
        "Sciatic nerve",
        "Popliteus muscle",
        "Long saphenous vein",
        "Inversion & eversion of foot",
        "Stomach - Blood supply & histology",
        "Head of pancreas - development",
        "Uterus & Ovary supports",
        "Anal canal gross, interior, development"
    ],

    "Physiology":[
        "Neuromuscular transmission",
        "Mechanism of blood coagulation",
        "Baroreceptor mechanism & short term BP regulation",
        "Cardiac cycle",
        "Oxygen transport",
        "Carbon dioxide transport",
        "Chemical regulation of respiration",
        "JGA functions & GFR dynamics",
        "Micturition reflex",
        "Mechanism of HCL secretion",
        "Growth hormone regulation",
        "Thyroid hormone synthesis & functions",
        "Spermatogenesis",
        "Different types of pain & Referred pain",
        "Role of hypothalamus in temp regulation"
    ],

    "Biochemistry":[
        "Glycosaminoglycans & significance",
        "HMP Shunt & its significance",
        "Biosynthesis & regulation of cholesterol",
        "Metabolism of glycine",
        "ETC describe, functions, inhibitors",
        "Heme synthesis & regulation",
        "Metabolic acidosis & alkalosis",
        "What are xenobiotics & how are they detoxified",
        "Calcium sources, functions, RDA",
        "Protein energy malnutrition",
        "Genetic code features",
        "Starvation"
    ]

};


/* ============================================================
   STATE
   ============================================================ */

let selectedAnswerType = "LAQ";
let generatedPrompt = "";
let lastAnswer = "";
let currentSubject = null;
