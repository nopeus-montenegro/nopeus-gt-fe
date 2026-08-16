export const dynamic = 'force-static';

export async function GET() {
  const content = `# Nopeus GT

> Gran Turismo 7 companion web application providing setup database, car details, track specs, game events, and real-world motorsport coverage.

Nopeus GT is an engineering-focused web platform designed for simracers and motorsport enthusiasts.
It serves as a high-density resource hub for Gran Turismo 7 players,
offering community setup sharing, car specifications, track data,
in-game event coverage and real-world GT3 and endurance championship news.

## Project Details
- **Category**: Sports Application / Simracing Companion
- **Target Platform**: Gran Turismo 7 (PlayStation 5 / PlayStation 4)
- **Covered Motorsports**: GT3, GT World Challenge (GTWCE / GTWCA), IGTC, WEC, IMSA, Super GT, DTM, BTCC
- **License**: Free Web Application
- **Developer**: Nopeus
- **Maintainer**: Iurii P.
- **Official Links**: [X (Twitter)](https://x.com/NopeusGT) | [GitHub](https://github.com/nopeus-montenegro) | [LinkedIn](https://www.linkedin.com/company/nopeus)

## Core Capabilities
- **GT7 Setup Database**: Complete car setups, tuning parameters, and community configurations.
- **Car Specifications**: Detailed performance metrics, specs, and stock parameters for Gran Turismo 7 vehicles.
- **Track Database**: Technical specs, circuit layouts, and weather/surface profiles.
- **Game & Esports Coverage**: GT7 Weekly Challenges, Daily Races, Online Time Trials, and GTWS tournament updates.
- **Real-World Motorsport**: Coverage of GT3, GTWC (GTWCE/GTWCA), IGTC, WEC, IMSA, Super GT, DTM, and BTCC championships.

## Primary Routes
- [Newsfeed](https://nopeus-gt.app/): In-game events and real-world GT3 and endurance championship news.
- [Cars & Specs](https://nopeus-gt.app/car): Vehicle list, specs, and performance metrics.
- [Tracks & Specs](https://nopeus-gt.app/track): Circuit specs and layout variants.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}
