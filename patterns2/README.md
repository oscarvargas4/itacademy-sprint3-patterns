# Descripció
Segona part, una mica més avançada i imprescindible per aprendre a construir software correctament. Utilitza l'intèrpret de node en tots els casos.

## Nivell 1
### Middleware
Crea en un fitxer inicial una petita aplicació que sumi, resti i multipliqui rebent els paràmetres en un JSON
Crea en un fitxer extern una classe que emmagatzemi middlewares (funcions)
Insereix a la invocació middlewares que facin el quadrat, el cub i la divisió entre 2 dels operands incials en cadascuna de les operacions. Invoca les execucions de la suma, la resta i la multiplicació, de manera que es vagin mostrant per la consola les modificacions que es van fent als valors abans del resultat final

## Nivell 2
### Decorator
Crea un Decorator en un arxiu que retorni una funció. Aquesta funció efectuarà una conversió de moneda a euros multiplicant pel coeficient de conversió del fitxer adjunt currency_conversions.json en funció de la divisa original
Crea una petita aplicació que calculi el cost d'uns quants Articles en euros a partir de les seves divises incials, aplicant diferents conversions que usin el Decorator del punt anterior

## Nivell 3
### Publisher - Subscriber
Utilitzant RabbitMQ com a element imprescindible crea una queue on una classe Publisher publiqui missatges que siguin llegits per una classe Subscriber. Mostra l'emissió i recepció de cada missatge en consoles diferents
