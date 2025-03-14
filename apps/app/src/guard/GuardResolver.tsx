import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export type GuardResolveFuncReturn =
  | {
      result: false;
      fallback: ReactNode;
    }
  | {
      result: true;
    }
  | {
      result: string;
    };

export type GuardResolveFunc = (...args: any) => GuardResolveFuncReturn;

type GuardRouteProps = {
  guardFuncs: GuardResolveFunc[];
};

export function GuardResolver({ guardFuncs }: GuardRouteProps) {
  const resolveGuard = (): ReactNode => {
    return guardFuncs.reduce<ReactNode>(
      (prev, curr, idx, arr) => {
        const guardResult = curr();
        const element =
          guardResult.result === true ? (
            <Outlet />
          ) : guardResult.result === false ? (
            guardResult.fallback
          ) : (
            <Navigate to={guardResult.result}></Navigate>
          );

        if (guardResult.result !== true) arr.splice(1);

        return element;
      },
      <Outlet />,
    );
  };

  return <>{resolveGuard()}</>;
}
