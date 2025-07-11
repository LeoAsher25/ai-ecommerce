'use server';

export const Await = async <T,>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
}) => {
  const data = await promise;

  return children(data);
};
