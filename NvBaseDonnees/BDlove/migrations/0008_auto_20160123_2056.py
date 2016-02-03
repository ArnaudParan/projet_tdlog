# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BDlove', '0007_utilisateur_geoloc_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='evenement',
            name='nb_participants',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='utilisateur',
            name='nb_amis',
            field=models.IntegerField(default=0),
        ),
    ]
