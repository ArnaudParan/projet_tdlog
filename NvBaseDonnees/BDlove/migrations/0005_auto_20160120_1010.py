# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BDlove', '0004_auto_20160119_1643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='utilisateur',
            name='amis',
            field=models.ManyToManyField(to='BDlove.Utilisateur', null=True, blank=True),
        ),
    ]
