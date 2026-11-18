import { Setup } from '@prisma/client';

export interface SuspensionFormValues {
  suspensionType: Setup['suspensionType'];
  susBodyHeightFront: Setup['susBodyHeightFront'];
  susBodyHeightRear: Setup['susBodyHeightRear'];
  susAntiRollBarFront: Setup['susAntiRollBarFront'];
  susAntiRollBarRear: Setup['susAntiRollBarRear'];
  susDampingCompFront: Setup['susDampingCompFront'];
  susDampingCompRear: Setup['susDampingCompRear'];
  susDampingExpFront: Setup['susDampingExpFront'];
  susDampingExpRear: Setup['susDampingExpRear'];
  susNaturalFreqFront: Setup['susNaturalFreqFront'];
  susNaturalFreqRear: Setup['susNaturalFreqRear'];
  susCamberFront: Setup['susCamberFront'];
  susCamberRear: Setup['susCamberRear'];
  susToeFront: Setup['susToeFront'];
  susToeRear: Setup['susToeRear'];
}
