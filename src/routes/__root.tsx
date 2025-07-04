import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ConfigProvider } from "antd";
import { casaPekGreenTheme } from "@/utils/themeUtils";
import { I18nextProvider } from "react-i18next";
import i18next from "../i18n.ts";
import { ApolloWrapper } from "@/lib/apolloProvider.tsx";
import { AuthProvider } from "@/context/AuthContext.tsx";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: () => {
    return (
      <ApolloWrapper>
        <ConfigProvider theme={casaPekGreenTheme}>
          <I18nextProvider i18n={i18next}>
            <>
              <Outlet />
              <TanStackRouterDevtools />
            </>
          </I18nextProvider>
        </ConfigProvider>
      </ApolloWrapper>
    );
  },
});

//
