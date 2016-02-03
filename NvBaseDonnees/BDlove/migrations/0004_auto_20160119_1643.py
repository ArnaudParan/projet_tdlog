# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BDlove', '0003_auto_20160119_1545'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='utilisateur',
            name='identifiant',
        ),
        migrations.AddField(
            model_name='utilisateur',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False, auto_created=True, default=1, verbose_name='ID'),
            preserve_default=False,
        ),
    ]
