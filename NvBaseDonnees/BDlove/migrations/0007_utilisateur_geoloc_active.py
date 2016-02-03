# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BDlove', '0006_auto_20160120_1011'),
    ]

    operations = [
        migrations.AddField(
            model_name='utilisateur',
            name='geoloc_active',
            field=models.BooleanField(default=False),
        ),
    ]
