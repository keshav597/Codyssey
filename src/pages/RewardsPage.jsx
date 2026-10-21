import PageContainer from '../components/layout/PageContainer';
import BadgeGrid from '../components/rewards/BadgeGrid';
import { useProgress } from '../hooks/useProgress';

export default function RewardsPage() {
  const { badges } = useProgress();

  return (
    <PageContainer title="Royal Trophy Vault">
      <BadgeGrid badges={badges} />
    </PageContainer>
  );
}
