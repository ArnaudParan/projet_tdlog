# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BDlove', '0005_auto_20160120_1010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='utilisateur',
            name='amis',
            field=models.ManyToManyField(blank=True, to='BDlove.Utilisateur'),
        ),
    ]
