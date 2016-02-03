# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BDlove', '0002_auto_20160113_1056'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='evenement',
            name='identifiant',
        ),
        migrations.AddField(
            model_name='evenement',
            name='id',
            field=models.AutoField(default=1, auto_created=True, serialize=False, verbose_name='ID', primary_key=True),
            preserve_default=False,
        ),
    ]
