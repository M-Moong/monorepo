import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { VenueMap } from './VenueMap';
import { TransportTabs } from './TransportTabs';
import { MapLinks } from './MapLinks';
import { WEDDING } from '@/data/wedding';

interface Props {
  inSlideGroup?: boolean;
}

export function Ch06Venue({ inSlideGroup }: Props) {
  return (
    <ChapterSection chIndex={5} inSlideGroup={inSlideGroup}>
      <ChHeader
        num={6}
        label="WHERE"
        title={
          <>
            Find
            <br />
            the place.
          </>
        }
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <VenueMap />

        <div className="mb-3.5 border-t border-b border-fg/15 py-3.5">
          <div className="font-serif text-[1.375rem] text-fg italic">{WEDDING.venue.short}</div>
          <div className="mt-1 text-[0.6875rem] text-fg/65">{WEDDING.venue.detail}</div>
          <div className="mt-2 font-mono text-[0.6875rem] text-fg/50">{WEDDING.venue.address}</div>
        </div>

        <TransportTabs />

        <MapLinks />
      </div>
    </ChapterSection>
  );
}
