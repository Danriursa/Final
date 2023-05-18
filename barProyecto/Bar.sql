use proyectoBar
GO

-- Triggers Proveedor_Producto

create TRIGGER TR_PrecioInsertado_Proveedor
ON dbo.Provedor_proveedorproducto FOR insert
AS
declare @Precio_compra decimal(10)
select @Precio_compra = Precio_compra from inserted
declare @Proveedor_id int
select @Proveedor_id = Proveedor_id from inserted
declare @id INT
select @id = Producto_id from inserted
update Provedor_precio set Fecha_final=DATEADD(ms,-3,dateadd(dd,DATEDIFF(dd,0,GETDATE()),0))
WHERE Producto_id=@id and Fecha_final IS NULL
insert into Provedor_precio VALUES((select Valor from Sede_producto where id=@id),@Precio_compra,dateadd(dd,DATEDIFF(dd,0,GETDATE()),0),null,@id,@Proveedor_id)
GO

create TRIGGER TR_PrecioAlterado_Proveedor
ON dbo.Provedor_proveedorproducto FOR update
AS
declare @Precio_compra decimal(10)
select @Precio_compra = Precio_compra from inserted
declare @id INT
select @id = Producto_id from inserted
declare @Proveedor_id int 
select @Proveedor_id = Proveedor_id from inserted
update Provedor_Precio set Fecha_final= DATEADD(ms,-3,dateadd(dd,DATEDIFF(dd,0,GETDATE()),0))
WHERE Producto_id=@id and Fecha_final IS NULL
insert into Provedor_Precio VALUES((select Valor from Sede_producto where id=@id),@Precio_compra,dateadd(dd,DATEDIFF(dd,0,GETDATE()),0),Null,@id,@Proveedor_id)
GO

-- Triggers Producto
Create TRIGGER TR_PrecioInsertado_Producto
ON dbo.Sede_producto FOR insert
AS
declare @Precio_compra decimal(10)
select @Precio_compra = Valor from inserted
declare @id INT
select @id = Id from inserted
if ((select Precio_compra from Provedor_proveedorproducto where Producto_id=@id)is not null)
BEGIN
insert into Provedor_precio VALUES(@Precio_compra,(select Precio_compra from Provedor_proveedorproducto where Producto_id=@id),dateadd(dd,DATEDIFF(dd,0,GETDATE()),0),null,@id,@id)
END
GO

Create TRIGGER TR_PrecioAlterado_Producto
ON dbo.Sede_producto FOR update
AS
declare @Precio_venta decimal(10)
select @Precio_venta = Valor from inserted
declare @id INT
select @id = id from inserted
declare @Proveedor_id int
select @Proveedor_id = (select proveedor_id_id from Provedor_precio WHERE Producto_id=@id and Fecha_final IS NULL)
declare @Precio_compra decimal(10)
select @Precio_compra =(select Precio_compra from Provedor_precio WHERE Producto_id=@id and Fecha_final IS NULL)
update Provedor_precio set Fecha_final= DATEADD(ms,-3,dateadd(dd,DATEDIFF(dd,0,GETDATE()),0))
WHERE Producto_id=@id and Fecha_final IS NULL
if ((select Precio_compra from Provedor_proveedorproducto where Producto_id=@id and Proveedor_id=@Proveedor_id)is not null)
BEGIN
insert into Provedor_precio VALUES(@Precio_venta, @Precio_compra ,dateadd(dd,DATEDIFF(dd,0,GETDATE()),0),Null,@id, @Proveedor_id) 
END
GO




insert into Provedor_proveedorproducto Values(1000,1,1)
