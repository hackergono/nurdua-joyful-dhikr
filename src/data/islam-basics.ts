export interface IslamBasic {
  id: string;
  title: string;
  arabic?: string;
  transliteration?: string;
  items?: { arabic: string; transliteration: string; english: string }[];
  description: string;
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
    description: "Wudu is the ritual washing performed before prayer to purify oneself.",
    items: [
      { arabic: "النِّيَّة", transliteration: "An-Niyyah", english: "Step 1: Make the intention in your heart to perform wudu." },
      { arabic: "غَسْلُ اليَدَيْن", transliteration: "Ghasl al-Yadayn", english: "Step 2: Wash both hands up to the wrists three times." },
      { arabic: "المَضْمَضَة", transliteration: "Al-Madmada", english: "Step 3: Rinse the mouth three times." },
      { arabic: "الاسْتِنْشَاق", transliteration: "Al-Istinshaq", english: "Step 4: Sniff water into the nostrils three times." },
      { arabic: "غَسْلُ الوَجْه", transliteration: "Ghasl al-Wajh", english: "Step 5: Wash the face three times." },
      { arabic: "غَسْلُ الذِّرَاعَيْن", transliteration: "Ghasl adh-Dhira'ayn", english: "Step 6: Wash both arms up to the elbows three times." },
      { arabic: "مَسْحُ الرَّأْس", transliteration: "Mash ar-Ra's", english: "Step 7: Wipe the head with wet hands once." },
      { arabic: "مَسْحُ الأُذُنَيْن", transliteration: "Mash al-Udhunain", english: "Step 8: Wipe the ears with wet fingers." },
      { arabic: "غَسْلُ القَدَمَيْن", transliteration: "Ghasl al-Qadamayn", english: "Step 9: Wash both feet up to the ankles three times." },
    ],
  },
];
