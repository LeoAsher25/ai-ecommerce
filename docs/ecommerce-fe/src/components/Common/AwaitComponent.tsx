export const AwaitComponent = async <T,>({
  promise,
  children,
}: {
  promise: Promise<T>
  children: (value: T) => React.ReactNode
}) => {
  const data = await promise

  // console.log("data: ", data);

  return children(data)
}
