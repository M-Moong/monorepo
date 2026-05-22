import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { VenueMap } from './VenueMap';
import { TransportTabs } from './TransportTabs';
import { MapLinks } from './MapLinks';
import { WEDDING } from '@/data/wedding';

export function Ch06Map() {
  return (
    <ChapterSection chIndex={5} scrollable>
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

      <VenueMap />

      <div className="mb-3.5 border-y border-fg/15 py-3.5">
        <div className="font-serif text-[1.375rem] text-fg italic">{WEDDING.venue.short}</div>
        <div className="mt-1 text-2xs text-fg/65">{WEDDING.venue.detail}</div>
        <div className="mt-2 font-mono text-2xs text-fg/50">{WEDDING.venue.address}</div>
      </div>

      <TransportTabs />

      <MapLinks />
    </ChapterSection>
  );
}
