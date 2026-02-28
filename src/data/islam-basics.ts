export interface IslamBasic {
  id: string;
  title: string;
  arabic?: string;
  transliteration?: string;
  items?: { arabic: string; transliteration: string; english: string }[];
  description: string;
  image?: string;
}

export const islamBasics: IslamBasic[] = [
  {
    id: "shahada",
    title: "Shahada – Declaration of Faith",
    arabic: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللّٰهِ",
    transliteration: "Ash-hadu an laa ilaaha illAllah, wa ash-hadu anna Muhammadan rasulullah",
    description: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah. This is the first and most important pillar of Islam.",
  },
  {
    id: "five-pillars",
    title: "Five Pillars of Islam",
    description: "The five foundational acts of worship that every Muslim must follow.",
    image: "five-pillars",
    items: [
      { arabic: "الشَّهَادَة", transliteration: "Ash-Shahada", english: "Declaration of Faith – Testifying that there is no god but Allah and Muhammad ﷺ is His Messenger." },
      { arabic: "الصَّلَاة", transliteration: "As-Salah", english: "Prayer – Five daily prayers performed facing the Kaaba in Makkah." },
      { arabic: "الزَّكَاة", transliteration: "Az-Zakah", english: "Charity – Giving 2.5% of savings annually to those in need." },
      { arabic: "الصَّوْم", transliteration: "As-Sawm", english: "Fasting – Fasting during the month of Ramadan from dawn to sunset." },
      { arabic: "الحَجّ", transliteration: "Al-Hajj", english: "Pilgrimage – Journey to Makkah at least once in a lifetime if able." },
    ],
  },
  {
    id: "six-articles",
    title: "Six Articles of Faith (Iman)",
    description: "The core beliefs that define a Muslim's faith.",
    image: "six-articles",
    items: [
      { arabic: "الإِيمَانُ بِاللّٰه", transliteration: "Al-Iman billah", english: "Belief in Allah – The One and Only God, Creator of everything." },
      { arabic: "الإِيمَانُ بِالمَلَائِكَة", transliteration: "Al-Iman bil-Mala'ika", english: "Belief in Angels – Created from light, they carry out Allah's commands." },
      { arabic: "الإِيمَانُ بِالكُتُب", transliteration: "Al-Iman bil-Kutub", english: "Belief in Holy Books – Torah, Psalms, Gospel, and the Quran." },
      { arabic: "الإِيمَانُ بِالرُّسُل", transliteration: "Al-Iman bir-Rusul", english: "Belief in Prophets – From Adam to Muhammad ﷺ (peace be upon them all)." },
      { arabic: "الإِيمَانُ بِاليَوْمِ الآخِر", transliteration: "Al-Iman bil-Yawm il-Akhir", english: "Belief in the Day of Judgment – A day when all will be held accountable." },
      { arabic: "الإِيمَانُ بِالقَدَر", transliteration: "Al-Iman bil-Qadr", english: "Belief in Divine Decree – Everything happens by Allah's will and wisdom." },
    ],
  },
  {
    id: "ihsan",
    title: "Ihsan – Excellence in Worship",
    arabic: "أَنْ تَعْبُدَ اللّٰهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ",
    transliteration: "An ta'bud Allaha ka'annaka taraahu, fa in lam takun taraahu fa innahu yaraak",
    description: "To worship Allah as though you see Him, and if you cannot see Him, then know that He sees you. This hadith from Prophet Muhammad ﷺ defines the highest level of faith.",
  },
  {
    id: "five-prayers",
    title: "The Five Daily Prayers",
    description: "Muslims pray five times a day at specific times as a direct connection with Allah.",
    image: "five-prayers",
    items: [
      { arabic: "الفَجْر", transliteration: "Al-Fajr", english: "Dawn Prayer – 2 rakaat, performed before sunrise." },
      { arabic: "الظُّهْر", transliteration: "Adh-Dhuhr", english: "Noon Prayer – 4 rakaat, performed after the sun passes its zenith." },
      { arabic: "العَصْر", transliteration: "Al-Asr", english: "Afternoon Prayer – 4 rakaat, performed in the late afternoon." },
      { arabic: "المَغْرِب", transliteration: "Al-Maghrib", english: "Sunset Prayer – 3 rakaat, performed just after sunset." },
      { arabic: "العِشَاء", transliteration: "Al-Isha", english: "Night Prayer – 4 rakaat, performed after twilight disappears." },
    ],
  },
  {
    id: "prophets",
    title: "Key Prophets in Islam",
    description: "Islam recognizes 25 prophets mentioned in the Quran. Here are some of the most prominent.",
    items: [
      { arabic: "آدَم", transliteration: "Adam", english: "The first human and first prophet created by Allah." },
      { arabic: "نُوح", transliteration: "Nuh (Noah)", english: "Built the Ark and preached for 950 years." },
      { arabic: "إِبْرَاهِيم", transliteration: "Ibrahim (Abraham)", english: "Father of prophets, built the Kaaba with his son Ismail." },
      { arabic: "مُوسَى", transliteration: "Musa (Moses)", english: "Spoke directly to Allah, led the Israelites from Pharaoh." },
      { arabic: "عِيسَى", transliteration: "Isa (Jesus)", english: "Born miraculously, performed miracles by Allah's permission." },
      { arabic: "مُحَمَّد ﷺ", transliteration: "Muhammad ﷺ", english: "The final Prophet and Messenger, sent as a mercy to all mankind." },
    ],
  },
  {
    id: "islamic-greetings",
    title: "Common Islamic Phrases",
    description: "Phrases Muslims use daily that carry deep spiritual meaning.",
    items: [
      { arabic: "السَّلَامُ عَلَيْكُم", transliteration: "As-Salamu Alaykum", english: "Peace be upon you – The Islamic greeting." },
      { arabic: "بِسْمِ اللّٰهِ", transliteration: "Bismillah", english: "In the name of Allah – Said before starting anything." },
      { arabic: "الحَمْدُ لِلّٰه", transliteration: "Alhamdulillah", english: "All praise is due to Allah – Said to express gratitude." },
      { arabic: "سُبْحَانَ اللّٰه", transliteration: "SubhanAllah", english: "Glory be to Allah – Said in awe and wonder." },
      { arabic: "اللّٰهُ أَكْبَر", transliteration: "Allahu Akbar", english: "Allah is the Greatest – Said to glorify Allah." },
      { arabic: "إِنْ شَاءَ اللّٰه", transliteration: "In sha Allah", english: "If Allah wills – Said when speaking of future plans." },
      { arabic: "مَا شَاءَ اللّٰه", transliteration: "Ma sha Allah", english: "As Allah has willed – Said to express appreciation." },
      { arabic: "جَزَاكَ اللّٰهُ خَيْرًا", transliteration: "JazakAllahu Khayran", english: "May Allah reward you with goodness – Said to thank someone." },
    ],
  },
  {
    id: "wudu",
    title: "Wudu – Ablution Before Prayer",
    description: "Wudu is the ritual washing performed before prayer to purify oneself. Follow these 10 steps:",
    image: "wudu-steps",
    items: [
      { arabic: "بِسْمِ اللّٰهِ", transliteration: "Bismillah", english: "Step 1: Say Bismillah — Begin in the name of Allah." },
      { arabic: "غَسْلُ اليَدَيْن", transliteration: "Ghasl al-Yadayn", english: "Step 2: Wash both hands up to the wrists — 3 times." },
      { arabic: "المَضْمَضَة", transliteration: "Al-Madmada", english: "Step 3: Rinse the mouth — 3 times." },
      { arabic: "الاسْتِنْشَاق", transliteration: "Al-Istinshaq", english: "Step 4: Rinse the nose — 3 times." },
      { arabic: "غَسْلُ الوَجْه", transliteration: "Ghasl al-Wajh", english: "Step 5: Wash the face — 3 times." },
      { arabic: "غَسْلُ الذِّرَاعِ اليُمْنَى", transliteration: "Ghasl adh-Dhira' al-Yumna", english: "Step 6: Wash the right hand from fingertips to elbow — 3 times." },
      { arabic: "غَسْلُ الذِّرَاعِ اليُسْرَى", transliteration: "Ghasl adh-Dhira' al-Yusra", english: "Step 7: Wash the left hand from fingertips to elbow — 3 times." },
      { arabic: "مَسْحُ الرَّأْسِ وَالأُذُنَيْن", transliteration: "Mash ar-Ra's wal-Udhunain", english: "Step 8: Wipe the head & ears — once." },
      { arabic: "غَسْلُ القَدَمِ اليُمْنَى", transliteration: "Ghasl al-Qadam al-Yumna", english: "Step 9: Wash the right foot up to the ankles — 3 times." },
      { arabic: "غَسْلُ القَدَمِ اليُسْرَى", transliteration: "Ghasl al-Qadam al-Yusra", english: "Step 10: Wash the left foot up to the ankles — 3 times." },
    ],
  },
  {
    id: "quran-facts",
    title: "About the Holy Quran",
    arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
    transliteration: "Inna nahnu nazzalna adh-dhikra wa inna lahu lahaafizoon",
    description: "The Quran is the final revelation from Allah, revealed to Prophet Muhammad ﷺ over 23 years. It has 114 Surahs (chapters), 6,236 Ayahs (verses), and has been preserved word-for-word since revelation.",
    items: [
      { arabic: "سُورَةُ الفَاتِحَة", transliteration: "Surah Al-Fatiha", english: "The Opening – Recited in every rakah of prayer, it is the greatest Surah." },
      { arabic: "سُورَةُ البَقَرَة", transliteration: "Surah Al-Baqarah", english: "The longest Surah – Contains Ayat al-Kursi, the greatest verse." },
      { arabic: "سُورَةُ يٰس", transliteration: "Surah Ya-Sin", english: "Called the heart of the Quran by the Prophet ﷺ." },
      { arabic: "سُورَةُ الرَّحْمٰن", transliteration: "Surah Ar-Rahman", english: "The Most Merciful – Describes Allah's countless blessings." },
      { arabic: "سُورَةُ الإِخْلَاص", transliteration: "Surah Al-Ikhlas", english: "Equal to one-third of the Quran in reward." },
    ],
  },
  {
    id: "ramadan",
    title: "Ramadan – The Holy Month",
    arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنْزِلَ فِيهِ الْقُرْآنُ",
    transliteration: "Shahru Ramadanal-ladhi unzila fihil Quran",
    description: "Ramadan is the 9th month of the Islamic calendar. Muslims fast from dawn to sunset, increase worship, give charity, and seek Laylat al-Qadr (the Night of Power).",
    items: [
      { arabic: "السُّحُور", transliteration: "As-Suhoor", english: "Pre-dawn meal – Eaten before Fajr to prepare for the fast." },
      { arabic: "الإِفْطَار", transliteration: "Al-Iftar", english: "Breaking the fast – Traditionally with dates and water at sunset." },
      { arabic: "صَلَاةُ التَّرَاوِيح", transliteration: "Salat at-Taraweeh", english: "Night prayers performed in congregation during Ramadan." },
      { arabic: "لَيْلَةُ القَدْر", transliteration: "Laylat al-Qadr", english: "The Night of Power – Better than a thousand months (Surah 97:3)." },
      { arabic: "زَكَاةُ الفِطْر", transliteration: "Zakat al-Fitr", english: "Charity given before Eid prayer to purify the fast." },
    ],
  },
  {
    id: "hadith-importance",
    title: "Hadith – Sayings of the Prophet ﷺ",
    arabic: "وَمَا يَنْطِقُ عَنِ الْهَوَىٰ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ",
    transliteration: "Wa ma yantiqu 'anil hawa, in huwa illa wahyun yuha",
    description: "Hadith are the recorded sayings, actions, and approvals of Prophet Muhammad ﷺ. They are the second source of Islamic law after the Quran.",
    items: [
      { arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", transliteration: "Innamal a'malu bin-niyyat", english: "Actions are judged by intentions – Foundation of all deeds." },
      { arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", transliteration: "La yu'minu ahadukum hatta yuhibba li akheehi ma yuhibbu li nafsihi", english: "None of you truly believes until he loves for his brother what he loves for himself." },
      { arabic: "مَنْ كَانَ يُؤْمِنُ بِاللّٰهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ", transliteration: "Man kana yu'minu billahi wal yawmil akhiri fal yaqul khayran aw liyasmut", english: "Whoever believes in Allah and the Last Day, let him speak good or remain silent." },
      { arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَة", transliteration: "Tabassumuqa fi wajhi akheeka sadaqa", english: "Smiling in your brother's face is charity." },
    ],
  },
  {
    id: "islamic-manners",
    title: "Adab – Islamic Manners & Etiquette",
    description: "Islam emphasizes beautiful conduct (Adab) in every aspect of daily life.",
    items: [
      { arabic: "الأَكْلُ بِاليَمِين", transliteration: "Al-Akl bil-Yameen", english: "Eat with the right hand – The Prophet ﷺ always ate with his right hand." },
      { arabic: "إِفْشَاءُ السَّلَام", transliteration: "Ifsha'us-Salam", english: "Spread the greeting of peace – Say Salam to those you know and don't know." },
      { arabic: "إِكْرَامُ الضَّيْف", transliteration: "Ikramud-Dayf", english: "Honor the guest – Hospitality is a sign of faith." },
      { arabic: "بِرُّ الوَالِدَيْن", transliteration: "Birrul-Walidayn", english: "Being dutiful to parents – One of the greatest deeds after prayer." },
      { arabic: "حُسْنُ الجِوَار", transliteration: "Husn al-Jiwar", english: "Good treatment of neighbors – Jibril kept advising about neighbors' rights." },
      { arabic: "الرِّفْقُ بِالحَيَوَان", transliteration: "Ar-Rifq bil-Hayawan", english: "Kindness to animals – A woman entered Paradise for giving water to a thirsty dog." },
    ],
  },
  {
    id: "before-sleeping",
    title: "Before Sleeping – Reminders",
    description: "Sunnah practices and duas to recite before going to sleep every night.",
    items: [
      { arabic: "سُورَةُ المُلْك", transliteration: "Surah Al-Mulk", english: "Recite Surah Al-Mulk (Surah 67) — it intercedes for its reader." },
      { arabic: "آيَةُ الكُرْسِي", transliteration: "Ayat al-Kursi", english: "Recite Ayat al-Kursi (Al-Baqarah 2:255) — Allah assigns a guardian over you." },
      { arabic: "سُورَةُ الإِخْلَاص، الفَلَق، النَّاس", transliteration: "Surah Ikhlas, Falaq & Nas", english: "Recite Surah Ikhlas, Surah Al-Falaq, and Surah An-Nas — 3 times each." },
      { arabic: "آخِرُ آيَتَيْنِ مِنْ سُورَةِ البَقَرَة", transliteration: "Last 2 Ayahs of Surah Al-Baqarah", english: "Recite verses 285-286 of Surah Al-Baqarah — they are sufficient for the one who recites them." },
      { arabic: "سُورَةُ السَّجْدَة", transliteration: "Surah As-Sajdah", english: "Recite Surah As-Sajdah (Surah 32) — The Prophet ﷺ would not sleep without reciting it." },
      { arabic: "نِيَّةُ الاسْتِيقَاظِ لِلْفَجْر", transliteration: "Niyyat al-Istiqaz lil-Fajr", english: "Make the intention to wake up for Fajr prayer." },
    ],
  },
];
