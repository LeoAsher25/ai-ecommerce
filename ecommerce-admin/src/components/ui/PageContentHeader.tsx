import { ReactNode } from 'react';

const PageContentHeader = ({
  title = '',
  headerExtra,
}: {
  title: string;
  headerExtra?: ReactNode;
}) => {
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <h1 className="text-2xl font-semibold md:text-[24px]">{title}</h1>

      <div>{headerExtra}</div>
    </div>
  );
};

export default PageContentHeader;
