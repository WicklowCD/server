from app.models.User import create_user


def create_new_user(first_name='Test', last_name='User', email='test@user.com', phone='0831221436', password='testPass', active=True):
    return create_user(first_name, last_name, email, phone, password, active)
