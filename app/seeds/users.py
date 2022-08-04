from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    leo = User(
        username='Leonardo', email='theblueone@tmnt.com', password='ImTheLeader', profile_pic='https://bbts1.azureedge.net/images/p/full/2021/10/2b882830-8c6f-4f6f-b272-8c919a9930ec.jpg')
    donnie = User(
        username='Donatello', email='thepurpleone@tmnt.com', password='IDoMachines', profile_pic='https://bbts1.azureedge.net/images/p/full/2021/09/6c46237b-6896-44a0-a353-f929dfa874af.jpg')
    raph = User(
        username='Raphael', email='theredone@tmnt.com', password='CoolButRude', profile_pic='https://bbts1.azureedge.net/images/p/full/2021/08/ef4ba14a-c499-48d9-a47e-cdac854e4831.jpg')
    mikey = User(
        username='Michelangelo', email='theorangeone@tmnt.com', password='PartyDude', profile_pic='https://i.redd.it/kkeamknm5yl71.jpg')
    optimus = User(
        username='Optimus Prime', email='autobotleader@cybertron.com', password='AutobotsRule', profile_pic='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Optimus_Prime_%28Transformers_-_The_Last_Knight%29.jpg/220px-Optimus_Prime_%28Transformers_-_The_Last_Knight%29.jpg')
    bee = User(
        username='Bumble Bee', email='therealbestone@cybertron.com', password='Stinger', profile_pic='https://bbts1.azureedge.net/images/p/full/2018/11/dfa8f799-d5f1-44ce-bc7b-345821c59944.jpg')
    megatron = User(
        username='Megatron', email='decepticonleader@cybertron.com', password='DecepticonsRule', profile_pic='https://bbts1.azureedge.net/images/p/full/2020/09/4b7cd59a-dc9a-45cf-8864-a8e111895586.jpg')
    rocket = User(
        username='Rocket', email='whatsaracoon@guardians.com', password="ILikeBigGuns", profile_pic='https://wallpaperaccess.com/full/1075427.jpg')
    groot = User(
        username='Groot', email='iamgroot@iamgroot.iamgroot', password='IAmGroot', profile_pic='https://bbts1.azureedge.net/images/p/full/2020/09/bc96d092-63c8-4c46-a353-2b0670795794.jpg')


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
