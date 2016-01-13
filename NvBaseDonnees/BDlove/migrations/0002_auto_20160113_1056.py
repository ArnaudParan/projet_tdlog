# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-13 09:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BDlove', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='evenement',
            name='nom',
            field=models.CharField(default='sans nom', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='utilisateur',
            name='email',
            field=models.CharField(default='email manquant', max_length=100),
            preserve_default=False,
        ),
    ]
