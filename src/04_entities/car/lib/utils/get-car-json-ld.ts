import { slugify } from '@/05_shared/utils/slugify';
import { CarInclude } from '../types';

export function getCarJsonLd(car: CarInclude) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Garage',
            'item': 'https://nopeus-gt.app',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Car',
            'item': 'https://nopeus-gt.app/car',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': `${car.manufacturer} ${car.name} ${car.year}`,
            'item': `https://nopeus-gt.app/car/${car.id}`,
          },
        ],
      },
      {
        '@type': 'Car',
        '@id': `https://nopeus-gt.app/car/${car.id}#car`,
        'name': `${car.manufacturer} ${car.name} ${car.year}`,
        'description': `Gran Turismo 7 tuning guide, specs and setups for ${car.manufacturer} ${car.name} ${car.year}.`,
        'image': `${process.env.NEXT_PUBLIC_BLOB_URL}/cars/${slugify([car.manufacturer, car.name, car.year.toString()])}.webp`,
        'brand': {
          '@type': 'Brand',
          'name': car.manufacturer,
        },
        'model': car.name,
        'vehicleModelDate': car.year,
        'driveWheelConfiguration': car.drivetrain,
        'category': car.class,
        'vehicleEngine': {
          '@type': 'EngineSpecification',
          'name': car.engineCode,
          'engineType': `${car.engineType} ${car.engineLayout}`,
          'engineDisplacement': {
            '@type': 'QuantitativeValue',
            'value': car.displacement,
            'unitText': 'cc',
          },
          'enginePower': {
            '@type': 'QuantitativeValue',
            'value': car.setups[0].power,
            'unitCode': 'BHP',
          },
          'torque': {
            '@type': 'QuantitativeValue',
            'value': car.setups[0].torque,
            'unitText': 'kgfm',
          },
        },
        'length': {
          '@type': 'QuantitativeValue',
          'value': car.length,
          'unitText': 'mm',
        },
        'width': {
          '@type': 'QuantitativeValue',
          'value': car.width,
          'unitText': 'mm',
        },
        'height': {
          '@type': 'QuantitativeValue',
          'value': car.height,
          'unitText': 'mm',
        },
        'weight': {
          '@type': 'QuantitativeValue',
          'value': car.setups[0].weight,
          'unitText': 'kg',
        },
        'author': {
          '@type': 'Person',
          '@id': 'https://nopeus-gt.app/#author',
          'name': 'Iurii P.',
          'url': 'https://www.linkedin.com/in/iurii-pototskii',
          'sameAs': [
            'https://www.linkedin.com/in/iurii-pototskii',
            'https://github.com/KAHUKYJlbl',
            'https://x.com/KAHUKYJlbl_me',
          ],
        },
      },
    ],
  };
}
