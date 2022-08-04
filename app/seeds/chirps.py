from app.models import db, Chirp

def seed_chirps():
  chirp1 = Chirp(
    body='This new Chipper app is great! Maybe even better than that other one!', userId=1)
  chirp11 = Chirp(
    body='I hope you all are having a great day!', userId=1)
  chirp21 = Chirp(
    body="I can't believe we're so close to graduation!", userId=1)
  chirp31 = Chirp(
    body="Yo Optimus! How's it goin, Big Guy?", userId=1)
  chirp41 = Chirp(
    body='Lesser leather never weathered wetter weather better', userId=1)
  chirp2 = Chirp(
    body='Master Splinter says I should train some more, so...here we are...', userId=2)
  chirp12 = Chirp(
    body="Training today was brutal, where's the pizza? I'm starving!", userId=2)
  chirp22= Chirp(
    body="Has anyone seen Raph? He's missing again.", userId=2)
  chirp32 = Chirp(
    body="Found a really good deal on a pair of sweet new katanas. Think it's time for an upgrade", userId=2)
  chirp42 = Chirp(
    body="I never thought I'd say this, but I kinda miss our epic battles with Shredder", userId=2)
  chirp3 = Chirp(
    body="Training...sort of. It's almost Turtle time", userId=3)
  chirp13 = Chirp(
    body="When life gives you lemons, construct a crude electrochemical battery!", userId=3)
  chirp23 = Chirp(
    body='Think like a proton, Always positive!', userId=3)
  chirp33 = Chirp(
    body='Science is like magic, but real.', userId=3)
  chirp43 = Chirp(
    body="If a pizza has a radius of 'z' and a thickness 'a' then its volume can be defined as Pi(z*z)a.", userId=3)
  chirp4 = Chirp(
    body="I swear if Leo makes me get up early to train one more time...", userId=4)
  chirp14 = Chirp(
    body='Remember that time Keno and I almost got away with infiltrating the foot clan? That was awesome!', userId=4)
  chirp24 = Chirp(
    body="I'm going out. Don't tell Leo.", userId=4)
  chirp34 = Chirp(
    body="I've got the itch to beat up some foot clan punks.", userId=4)
  chirp44 = Chirp(
    body='Ugh...Mondays. Amirite?!', userId=4)
  chirp5 = Chirp(
    body='Cowabunga Dudes and Dudettes!', userId=5)
  chirp15 = Chirp(
    body='Man, me and the bros were beating up some bad guys last night and all I could think about was what I wanted on my pizza after. No anchovies, obv.', userId=5)
  chirp25 = Chirp(
    body='Go Ninja, Go Ninja, Go! Still a banger!', userId=5)
  chirp35 = Chirp(
    body="I know I've said it before, but man I love being a turtle!", userId=5)
  chirp45 = Chirp(
    body='Piiiiiiizza!!!! That is all.', userId=5)
  chirp6 = Chirp(
    body='We autobots have scoured your internet, and this is easily the best communication platform available.', userId=6)
  chirp16 = Chirp(
    body='In the wise words of Bumble Bee.......', userId=6)
  chirp26 = Chirp(
    body="Bee is mad at me because of my last chirp. I'm sorry Bee.", userId=6)
  chirp36 = Chirp(
    body='Me and Bee are better now. Now to find Megatron', userId=6)
  chirp46 = Chirp(
    body='Autobots!!! Roll Out!!!', userId=6)
  chirp7 = Chirp(
    body='Float like a butterfly, Sting like me! ', userId=7)
  chirp17 = Chirp(
    body="Optimus tried to make a joke and failed. Now I'm mad", userId=7)
  chirp27 = Chirp(
    body="Simple misunderstanding guys. We're good now.", userId=7)
  chirp37 = Chirp(
    body="I guess we're going to go fight Megatron again. Be back later.", userId=7)
  chirp47 = Chirp(
    body='We won...again. When will he ever learn.', userId=7)
  chirp8 = Chirp(
    body="I'm so sick of losing to those darn autobots.", userId=8)
  chirp18 = Chirp(
    body="I think I have a plan...", userId=8)
  chirp28 = Chirp(
    body='Those autobots are fighting with themselves. Now is my chance.', userId=8)
  chirp38 = Chirp(
    body="I'm going to get Prime once and for all!", userId=8)
  chirp48 = Chirp(
    body='Ugh...next time Prime!', userId=8)
  chirp9 = Chirp(
    body="Hey Groot, help me. I need a stick of gum, a shoelace, an ink pen, ...and that guy's prosthetic leg.", userId=9)
  chirp19 = Chirp(
    body='HAHAHA He actually got me the leg. I was just kidding about that. What did he look like hopping around on one leg?', userId=9)
  chirp29 = Chirp(
    body='Ok, Groot. Whatever you do, do not push this button.', userId=9)
  chirp39 = Chirp(
    body='Phew...Groot almost pushed the "kill us all" button, but I caught him just in time.  You\'re welcome, World.', userId=9)
  chirp49 = Chirp(
    body="From fighting and defeating Thanos, to this. All of sitting around like idiots, posting things on the internet.", userId=9)
  chirp10 = Chirp(
    body='I am Groot', userId=10)
  chirp20 = Chirp(
    body='I am Groot', userId=10)
  chirp30 = Chirp(
    body='I am Groot', userId=10)
  chirp40 = Chirp(
    body='I am Groot', userId=10)
  chirp50 = Chirp(
    body='I am Groot', userId=10)

  db.session.add(chirp1)
  db.session.add(chirp2)
  db.session.add(chirp3)
  db.session.add(chirp4)
  db.session.add(chirp5)
  db.session.add(chirp6)
  db.session.add(chirp7)
  db.session.add(chirp8)
  db.session.add(chirp9)
  db.session.add(chirp10)
  db.session.add(chirp11)
  db.session.add(chirp12)
  db.session.add(chirp13)
  db.session.add(chirp14)
  db.session.add(chirp15)
  db.session.add(chirp16)
  db.session.add(chirp17)
  db.session.add(chirp18)
  db.session.add(chirp19)
  db.session.add(chirp20)
  db.session.add(chirp21)
  db.session.add(chirp22)
  db.session.add(chirp23)
  db.session.add(chirp24)
  db.session.add(chirp25)
  db.session.add(chirp26)
  db.session.add(chirp27)
  db.session.add(chirp28)
  db.session.add(chirp29)
  db.session.add(chirp30)
  db.session.add(chirp31)
  db.session.add(chirp32)
  db.session.add(chirp33)
  db.session.add(chirp34)
  db.session.add(chirp35)
  db.session.add(chirp36)
  db.session.add(chirp37)
  db.session.add(chirp38)
  db.session.add(chirp39)
  db.session.add(chirp40)
  db.session.add(chirp41)
  db.session.add(chirp42)
  db.session.add(chirp43)
  db.session.add(chirp44)
  db.session.add(chirp45)
  db.session.add(chirp46)
  db.session.add(chirp47)
  db.session.add(chirp48)
  db.session.add(chirp49)
  db.session.add(chirp50)

  db.session.commit()

def undo_seed_chirps():
  db.session.execute('TRUNCATE chirps RESTART IDENTITY CASCADE;')
  db.session.commit()
