# Generated by Django 5.0.4 on 2024-05-05 22:54

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_user_alergia_descricao_user_alergias_user_aluno_udc_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nascimento',
            field=models.DateField(default=datetime.datetime(2024, 5, 5, 22, 54, 14, 732558, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='user',
            name='raca',
            field=models.CharField(choices=[('branca', 'Branca'), ('preta', 'Preta'), ('parda', 'Parda'), ('amarela', 'Amarela'), ('indigena', 'Indígena'), ('outro', 'Outro')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='tipo_sanguineo',
            field=models.CharField(choices=[('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'), ('AB+', 'AB+'), ('AB-', 'AB-'), ('O+', 'O+'), ('O-', 'O-'), ('nao_sei', 'Não sei')], default='', max_length=7),
        ),
        migrations.CreateModel(
            name='Satisfacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('satisfeito', models.CharField(choices=[('sim', 'Sim'), ('nao', 'Não')], default='', max_length=3)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]