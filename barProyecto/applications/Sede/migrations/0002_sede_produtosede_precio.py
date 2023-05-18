# Generated by Django 4.1.9 on 2023-05-18 17:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Sede', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sede',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30)),
                ('direccion', models.CharField(max_length=30)),
                ('telefono', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ProdutoSede',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Sede.producto')),
                ('sede', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Sede.sede')),
            ],
        ),
        migrations.CreateModel(
            name='Precio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('proveedor_id', models.IntegerField()),
                ('precio_venta', models.DecimalField(decimal_places=0, max_digits=15)),
                ('precio_compra', models.DecimalField(decimal_places=0, max_digits=15)),
                ('fecha_inicio', models.DateTimeField()),
                ('fecha_final', models.DateTimeField()),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Sede.producto')),
            ],
        ),
    ]
