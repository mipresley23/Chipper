from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='@Demo', name='Demo', email='demo@aa.io', password='password', profile_pic='https://mpchipper.s3.us-east-2.amazonaws.com/dcc4d465cb984a37b2c6bb49ae08e416.png', bio='')
    leo = User(
        username='@Leonardo', name='Leonardo', email='theblueone@tmnt.com', password='ImTheLeader', profile_pic='https://mpchipper.s3.us-east-2.amazonaws.com/ecdd348f02b541ffa340602395e8f74b.jpg', bio='')
    donnie = User(
        username='@Donatello', name='Donatello', email='thepurpleone@tmnt.com', password='IDoMachines', profile_pic='https://mpchipper.s3.us-east-2.amazonaws.com/291d8b77c87f42ea91a3f743141f6279.jpg', bio='')
    raph = User(
        username='@Raphael', name='Raphael', email='theredone@tmnt.com', password='CoolButRude', profile_pic='https://mpchipper.s3.us-east-2.amazonaws.com/ac31d89d01c946e3b998b61d8dc93a5c.jpg', bio='')
    mikey = User(
        username='@Michelangelo', name='Michalangelo', email='theorangeone@tmnt.com', password='PartyDude', profile_pic='https://mpchipper.s3.us-east-2.amazonaws.com/0d8f00962a0d426bbac9c97990e980a5.jpg', bio='')
    optimus = User(
        username='@OptimusPrime', name='Optimus Prime', email='autobotleader@cybertron.com', password='AutobotsRule', profile_pic='https://mpchipper.s3.us-east-2.amazonaws.com/bd820d849b144176b98df3cace05756c.jpg', bio='')
    bee = User(
        username='@BumbleBee', name='Bumble Bee', email='therealbestone@cybertron.com', password='Stinger', profile_pic='https://mpchipper.s3.us-east-2.amazonaws.com/1ad6854caaca4806a959a8404ff3cd24.jpg', bio='')
    megatron = User(
        username='@Megatron', name='Megatron', email='decepticonleader@cybertron.com', password='DecepticonsRule', profile_pic='https://mpchipper.s3.amazonaws.com/3de757d4fe08461c8e50767b8aee14fd.jpg', bio='')
    rocket = User(
        username='@Rocket', name='Rocket', email='whatsaracoon@guardians.com', password="ILikeBigGuns", profile_pic='https://mpchipper.s3.amazonaws.com/607c153d2eb9427880c8bebe15ddccb4.jpg', bio='')
    groot = User(
        username='@Groot', name='Groot', email='iamgroot@iamgroot.iamgroot', password='IAmGroot', profile_pic='https://mpchipper.s3.amazonaws.com/fec6acbb38824856a6606c98967e7d3b.jpg', bio='')


    db.session.add(demo)
    db.session.add(leo)
    db.session.add(donnie)
    db.session.add(raph)
    db.session.add(mikey)
    db.session.add(optimus)
    db.session.add(bee)
    db.session.add(megatron)
    db.session.add(rocket)
    db.session.add(groot)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
