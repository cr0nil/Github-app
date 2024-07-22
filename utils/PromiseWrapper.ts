const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

// var Promise = require("promise"); //https://github.com/reactwg/react-native-releases/discussions/48#discussioncomment-4298769

export const promiseWrapper = async <T>(
  promise: Promise<T>
): Promise<[T, Error]> => {
  const data = await Promise.allSettled([promise]);
  const response = data.find(isFulfilled)?.value;
  const error = data.find(isRejected)?.reason;

  return [response?.data as T, error];
};
