# Android loyihasiga: 1) animanxwa:// havolalari, 2) skrinshotni taqiqlash, 3) ikonka, 4) qora ishga tushish fonu
import re, glob, os, zipfile
m = 'android/app/src/main/AndroidManifest.xml'
s = open(m, encoding='utf-8').read()
f = '''<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="animanxwa"/>
</intent-filter>
'''
open(m, 'w', encoding='utf-8').write(s.replace('</activity>', f + '</activity>', 1))
j = glob.glob('android/app/src/main/java/**/MainActivity.java', recursive=True)[0]
t = open(j, encoding='utf-8').read()
t = re.sub(r'public class MainActivity extends BridgeActivity\s*\{\s*\}',
  'public class MainActivity extends BridgeActivity {\n  @Override public void onCreate(android.os.Bundle b){ super.onCreate(b); getWindow().setFlags(8192, 8192); }\n}', t)
open(j, 'w', encoding='utf-8').write(t)
res = 'android/app/src/main/res'
for z in ('icons.zip', 'scripts/icons.zip'):
    if os.path.exists(z):
        zipfile.ZipFile(z).extractall(res); break
for p in glob.glob(res + '/drawable*/splash.png'): os.remove(p)
os.makedirs(res + '/drawable', exist_ok=True)
open(res + '/drawable/splash.xml', 'w').write('<?xml version="1.0" encoding="utf-8"?><shape xmlns:android="http://schemas.android.com/apk/res/android"><solid android:color="#000000"/></shape>')

# doimiy imzo + har yig'ishda oshadigan versiya (yangilash uchun shart)
import base64, subprocess
kb = base64.b64decode('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')
ks = os.path.expanduser('~/.android'); os.makedirs(ks, exist_ok=True)
open(ks + '/debug.keystore', 'wb').write(kb)
open('android/app/ax.keystore', 'wb').write(kb)
n = os.environ.get('GITHUB_RUN_NUMBER', '1')
g = 'android/app/build.gradle'
b = open(g, encoding='utf-8').read()
b = re.sub(r'versionCode\s+\d+', 'versionCode ' + n, b, count=1)
b = re.sub(r'versionName\s+"[^"]*"', 'versionName "1.' + n + '"', b, count=1)
b = re.sub(r'android\s*\{', 'android {\n    signingConfigs {\n        debug {\n            storeFile file("ax.keystore")\n            storePassword "android"\n            keyAlias "androiddebugkey"\n            keyPassword "android"\n        }\n    }', b, count=1)
open(g, 'w', encoding='utf-8').write(b)
try:
    print(subprocess.run(['keytool', '-list', '-keystore', 'android/app/ax.keystore', '-storepass', 'android'], capture_output=True, text=True).stdout)
except Exception as e:
    print('keytool topilmadi', e)

# server manzili (api.txt) ilovaga joylanadi; server rejimida parol xeshlari APK ichidan olib tashlanadi
api = open('api.txt', encoding='utf-8').read().strip() if os.path.exists('api.txt') else ''
for f in glob.glob('android/app/src/main/assets/public/app.js'):
    a = open(f, encoding='utf-8').read().replace('__API__', api)
    if api: a = re.sub(r'H1="[0-9a-f]{64}",H2="[0-9a-f]{64}"', 'H1="",H2=""', a)
    open(f, 'w', encoding='utf-8').write(a)
print('Server manzili:', api or "(bosh: lokal rejim)")
