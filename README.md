# AniManxwa ilovasi (v0.1)

## APK ni olish (kompyutersiz, bepul)
1. GitHub'da yangi repo oching (Private ham bo'ladi).
2. Zip ichidagi HAMMA fayllarni yuklang, `.github` papkasi bilan. Yuklanmasa: Add file -> Create new file -> nomiga `.github/workflows/apk.yml` yozib, fayl matnini qo'ying.
3. Actions -> "APK yigish" -> Run workflow. 5-10 daqiqa kuting.
4. Tugagach ish ichida Artifacts -> `AniManxwa-apk` -> zip -> ichida `app-debug.apk`. Uni Telegramga yuklang.
Xato chiqsa, Actions'dagi qizil qadam matnini yuboring.

## Cloudinary (rasmlar uchun)
cloudinary.com -> Settings -> Upload -> Upload presets -> Add -> Signing mode: **Unsigned** -> saqlang.
Ilovada: Admin paneli -> Baza -> `cloud name` va `preset nomi` ni kiriting (2-parol kerak). Bir nechta baza qo'shsangiz, biri ishlamasa keyingisiga o'tadi.

## Birinchi admin
Profil -> "ID ma'lumotingiz" -> maydonga 2-parolni yozing: shu telefon admin bo'ladi. Keyingi safar shu yerga o'z ID raqamingizni kiriting: "+" tugmasi va "Admin paneli" ochiladi. Panelga kirish uchun 1- yoki 2-parol kerak, 4 soat faol bo'lmasangiz yopiladi.

## Parollar
Kodda oddiy matn emas, SHA-256 xesh turadi (`www/app.js` boshida H1, H2). O'zgartirish: `printf %s 'YANGI_PAROL' | sha256sum`.

## Havola
`animanxwa://manhwa/{manhwaId}` va `animanxwa://manhwa/{manhwaId}/{bobId}` ulangan (sayt bilan mos).

## Hozircha yo'q (keyingi bosqich)
- Ma'lumotlar telefonning ichida saqlanadi (har telefonda alohida). Foydalanuvchilar ro'yxati, adminlik berish/olish, bildirishnoma, obuna to'lovi ishlashi uchun umumiy baza (Firebase) ulanadi.
- Bob sahifalarini qo'shilgandan keyin tahrirlash (qo'shish paytida ↑ ↓ ✕ bor), tarjimon so'rovi, donat.
- Parol tekshiruvi hozircha ilova ichida; haqiqiy himoya serverga o'tganda bo'ladi.
- Skrinshot va yozib olish taqiqlangan (FLAG_SECURE). Rasm havolasini texnik odam topishi mumkin; keyin yopiq havolalarga o'tamiz.
