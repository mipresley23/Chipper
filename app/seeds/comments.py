from app.models import db, Comment

def seed_comments():
  comment1 = Comment(
    body="My Autobots and I are doing very well, thank you.", userId=6, chirpId=31)
  comment2 = Comment(
    body="Uhhh....What?", userId=4, chirpId=41)
  comment3 = Comment(
    body="Bro, you totally should get em!", userId=3, chirpId=32)
  comment4 = Comment(
    body="Same bro!", userId=4, chirpId=42)
  comment5 = Comment(
    body="You know what else is like magic? Pizza delivery!!", userId=5, chirpId=33)
  comment6 = Comment(
    body="What is this...pizza?", userId=9, chirpId=43)
  comment7 = Comment(
    body="Easy Raph, let's come up with a strategic plan and not just rush into a fight.", userId=2, chirpId=34)
  comment8 = Comment(
    body='The WORST!', userId=1, chirpId=44)
  comment9 = Comment(
    body='You can say that again, brother!', userId=3, chirpId=35)
  comment10 = Comment(
    body='Yes, please', userId=2, chirpId=45)
  comment11 = Comment(
    body="I'm here waiting for you, Prime!!!", userId=8, chirpId=36)
  comment12 = Comment(
    body='Right with you, Optimus!', userId=7, chirpId=46)
  comment13 = Comment(
    body="Yeah we are! He's going down!", userId=6, chirpId=37)
  comment14 = Comment(
    body="Nice job guys! He'll learn one of these days", userId=1, chirpId=47)
  comment15 = Comment(
    body="Didn't you say that last time?", userId=1, chirpId=38)
  comment16 = Comment(
    body='Stay down, Megatron!', userId=6, chirpId=48)
  comment17 = Comment(
    body='I am Groot!', userId=10, chirpId=39)
  comment18 = Comment(
    body="I don't know who Thanos is, but I'm also sitting here eating pizza, so...not an idiot.", userId=5, chirpId=49)
  comment19 = Comment(
    body='Totally right, Groot', userId=9, chirpId=40)
  comment20 = Comment(
    body="...I don't understand", userId=7, chirpId=50)


  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)
  db.session.add(comment6)
  db.session.add(comment7)
  db.session.add(comment8)
  db.session.add(comment9)
  db.session.add(comment10)
  db.session.add(comment11)
  db.session.add(comment12)
  db.session.add(comment13)
  db.session.add(comment14)
  db.session.add(comment15)
  db.session.add(comment16)
  db.session.add(comment17)
  db.session.add(comment18)
  db.session.add(comment19)
  db.session.add(comment20)

  db.session.commit()

def undo_seed_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
