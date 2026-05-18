import { ChapterSection } from '@/components/ui/ChapterSection';
import { ChHeader } from '@/components/ui/ChHeader';
import { VenueMap } from './VenueMap';
import { TransportTabs } from './TransportTabs';
import { MapLinks } from './MapLinks';
import { WEDDING } from '@/data/wedding';

export function Ch06Venue() {
  return (
    <ChapterSection chIndex={5}>
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

      <div className="border-fg/[.15] mb-[14px] border-b border-t py-[14px]">
        <div className="text-fg font-serif text-[22px] italic">{WEDDING.venue.short}</div>
        <div className="text-fg/65 mt-1 text-[11px]">{WEDDING.venue.detail}</div>
        <div className="text-fg/50 mt-2 font-mono text-[11px]">{WEDDING.venue.address}</div>
      </div>

      <TransportTabs />

      <MapLinks />
    </ChapterSection>
  );
}
