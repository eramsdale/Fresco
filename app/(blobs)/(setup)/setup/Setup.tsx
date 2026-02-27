'use client';

import { motion } from 'motion/react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { containerClasses } from '~/components/ContainerClasses';
import { cn } from '~/utils/shadcn';
import CreateAccount from '../_components/OnboardSteps/CreateAccount';
import Documentation from '../_components/OnboardSteps/Documentation';
import ManageParticipants from '../_components/OnboardSteps/ManageParticipants';
import UploadProtocol from '../_components/OnboardSteps/UploadProtocol';
import OnboardSteps from '../_components/Sidebar';
import type { SetupData } from './page';

export default function Setup({ setupData }: { setupData: SetupData }) {
  const [step, setStep] = useQueryState('step', parseAsInteger.withDefault(1));

  const steps = [
    {
      label: 'Create Account',
      component: CreateAccount,
    },
    {
      label: 'Upload Protocol',
      component: UploadProtocol,
    },
    {
      label: 'Configure Participation',
      component: () => (
        <ManageParticipants
          allowAnonymousRecruitment={setupData.allowAnonymousRecruitment}
          limitInterviews={setupData.limitInterviews}
        />
      ),
    },
    {
      label: 'Documentation',
      component: Documentation,
    },
  ];

  const cardClasses = cn(containerClasses, 'flex-row bg-transparent p-0 gap-6');
  const mainClasses = cn('bg-white flex w-full p-12 rounded-xl');

  useEffect(() => {
    if (!setupData.hasAuth && step > 1) {
      void setStep(1);
      return;
    }

    if (setupData.hasAuth && step === 1) {
      void setStep(2);
      return;
    }
  }, [step, setStep, setupData]);

  const StepComponent = steps[step - 1]!.component;

  return (
    <motion.div className={cardClasses}>
      <OnboardSteps steps={steps.map((step) => step.label)} />
      <div className={mainClasses}>
        <StepComponent />
      </div>
    </motion.div>
  );
}
