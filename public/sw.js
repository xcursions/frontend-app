/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-amd */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
if (!self.define) {
  let s;
  const e = {};
  const a = (a, i) => (
    (a = new URL(`${a}.js`, i).href),
    e[a] ||
      new Promise((e) => {
        if ("document" in self) {
          const s = document.createElement("script");
          (s.src = a), (s.onload = e), document.head.appendChild(s);
        } else (s = a), importScripts(a), e();
      }).then(() => {
        const s = e[a];
        if (!s) throw new Error(`Module ${a} didn’t register its module`);
        return s;
      })
  );
  self.define = (i, c) => {
    const n =
      s ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (e[n]) return;
    const t = {};
    const f = (s) => a(s, n);
    const r = { module: { uri: n }, exports: t, require: f };
    e[n] = Promise.all(i.map((s) => r[s] || f(s))).then((s) => (c(...s), t));
  };
}
define(["./workbox-50de5c5d"], function (s) {
  importScripts(),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "bad18b2c03d9bff9cdd569c090d90867",
        },
        {
          url: "/_next/static/chunks/00cbbcb7-95f3b70b90adf34f.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/0c428ae2-941adea488c31f0d.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/0e5ce63c-34ad265c04b7278c.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/12038df7-eaccc3036ef04b06.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/1279-c582698ce4e3bb80.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/1585-d9c803aebcff3fab.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/1844-2450f534a1b78912.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/1a48c3c1-394082adf3c44d01.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/1bfc9850-5e3af4404294adea.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/2130-c0f543f1524157b4.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/23-0d11945d1f227b99.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/2376-a030656fa80de538.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/252f366e-943b4a639bf2a7b0.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/2531-5690bfe416304743.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/3096-74ef1cfb6030ce51.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/3216-421e1d3d2a5dc0fc.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/3253-0c22dcb26da66e9f.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/3431-ea546d16008c9302.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/350-1dec61a8f3fa67c9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/358ff52d-d816764c8e6dea2e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/3627521c-645848fb418d4c62.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/4061-da6ee13a2215d55b.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/4680-b048b7b80de09598.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/4825-437e52796534d94c.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/48507feb-b44df3e09b742fad.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/4949-4e9e42b1b7068f70.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/4cb6dfa8-aed6edacbf2617ae.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/4f9d9cd8-07432a6c66a480d9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/5072-31795fdcd58006b1.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/5675-57c8653ebd63a715.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/596-0bae2fe9beb87703.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/597.58ab34d0e09f6cc3.js",
          revision: "58ab34d0e09f6cc3",
        },
        {
          url: "/_next/static/chunks/6123.e305c3f66b9c7590.js",
          revision: "e305c3f66b9c7590",
        },
        {
          url: "/_next/static/chunks/6219-f5d6739d0e2797d7.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6316-bd9fb20f63c6d53f.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6560-b898f14a58147775.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6576-1c3b706281a411fd.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6622-05198efbdcaa6592.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6645-2db6aaab6ad2f2d7.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6691-54a0dac133f42daf.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6728d85a-acfc5229c1a4369f.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/6893-cc6681bf1da773a2.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/7292-53f7cd24ab487ec9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/737dfa3e-2758d73a2b55674a.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/7667-ea1fcaa4f12d5acb.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/7791-40573f1860fe86d9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/78e521c3-20bef99bdb18c8e2.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8136-639ab302ba1fbdf0.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8216-5c29b7a58f4e4df2.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8328-849ebac44fb21668.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8643-dab33cf5a274b5c9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8663.29e4112ce8515b53.js",
          revision: "29e4112ce8515b53",
        },
        {
          url: "/_next/static/chunks/8830-28a1f6ac1fe0068a.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8911-b9f52841897567a7.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8920-8dc17a8495341908.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8dc5345f-c7ae689075d40e90.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/8e68d877-e01d5b11d1592869.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/9081a741-72e23c060855225c.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/9149-d505b25245298a13.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/9336-fc480932d4c0a9c0.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/93854f56-3388cc27e7824be0.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/98916abf-f133dbc2f5a4aed3.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/9b380ffa-725c7d3eacc1b784.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/a6eb9415-2a4bc1dd8d10389e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/%5B...not_found%5D/page-84cb7217763b9563.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/about-us/layout-d1fb3bec40db928f.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/about-us/page-04d30b1766fa2cd5.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/bookings/page-57cc82f00f5ac742.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/customers/page-aa183734bf08d715.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/dashboard/page-a1779d17864f2292.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/layout-fa1c7ca6c578d7f7.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/login/page-028fafc705d2aa4c.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/messages/page-016f2898a0f33adc.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/services/%5Bslug%5D/page-df87e2003c29736c.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/services/blog/%5Bslug%5D/page-7174d893735fe9fe.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/services/blog/new-blog/page-24cb00ae84528812.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/services/page-32b49e360590b166.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/settings/page-a03797b39c9385bb.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/settings/teams/page-09451ee0ae2db622.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/admin/transactions/page-a052d4103fc42ee4.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/blog/%5Bslug%5D/page-2730bffd4e170417.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/blog/layout-e0e8158bab2d8f21.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/blog/page-11affdf813f3259d.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/checkout/page-2325962ac196ef7e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/checkout/trips/page-11dbf8c3ba1e5730.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/contact-us/layout-7194807e17023268.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/contact-us/page-cc23eb20d1d44482.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/events/%5Bslug%5D/page-f7942c3e643923f2.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/events/layout-e2599951915d0416.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/events/page-23dfd164923efb2f.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/forgot-password/page-2e57d8918c1af3e5.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/layout-c4bc050defc363b0.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/login/layout-ec85283dd01026a9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/login/page-86f8eb8298e28c7b.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/not-found-6ad5db4edd28ee95.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/page-9666dc75423172ff.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/privacy-policy/page-d7dda502a8408bcd.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/signup/page-7915067cb6a1f394.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/terms/page-ddc3a5f34970c983.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/trips/%5Bslug%5D/page-41011a9da7119efc.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/trips/layout-9a3c63ac78fe6792.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/trips/page-3d76036c581d97ba.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/account/chat/page-28321a8331eac48e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/account/favourite/page-7a7d9b6439ea91bd.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/account/page-17ebb4856926a2b6.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/account/payment/page-b3f9b2f42ef1914c.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/account/schedule/page-6b51d3280837a9f5.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/booking/history/page-f161d1d538bef971.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/booking/page-a787107b702600df.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/dashboard/page-7810f6cd6f2d7699.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/layout-c6eaa6965b33b1f2.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/wallet/history/page-066513ca0582215e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/wallet/page-50d076b0a4e18cc9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/user/wallet/saving-plan/page-df12bdd2b9e38176.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/verify-forgot-password/otp/page-61fcf051632b87dc.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/verify-forgot-password/page-2a1370e07efcf36a.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/app/verify/page-209a60067e17b366.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/bc9c3264-2e839f0769eb211b.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/ca377847-fba19c255f8dc0ea.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/cdfd8999-fcc28ddbb7f68ce6.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/d0c16330-315d1fa9a1f85c24.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/d0deef33-f8d7a75057e6ab0d.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/d52199b0-a56f56ffd91c42db.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/d7eeaac4-84beca708dc703c2.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/e416a3ff-1b2b348ff8d27a2b.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/ec3863c0-2cb83364083ce7af.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/f71da141.1e828a55c332faa5.js",
          revision: "1e828a55c332faa5",
        },
        {
          url: "/_next/static/chunks/fd9d1056-a5aae06f57fd1dbb.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/framework-b676d2a2eac8107b.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/main-8c7ce98a9c3d26f8.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/main-app-26daf0dad618f083.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Favourites-8542ca390134c106.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Favourites/FavouriteInfo-c51f4375e7a0ad9b.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Payment-99a9a1e50ea83882.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Payment/PaymentInfo-0c56448369db778e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Profile-ff9030cecd255451.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Profile/ProfileForm-943d6f83126f2aee.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Schedule-50fd10de72cb943e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/Schedule/ScheduleInfo-a0f02cd88595e1cc.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/_app-8af45f6c5c3cbc8e.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/_error-6aec2ce618e2a362.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/booking-99113214244b5314.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/chat-b97ece064c411269.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/dashboard-719fcee41bcca2fa.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/wallet-10804e5fad126bb9.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/pages/wallet/cardModal/cardModal-de6e195aa197ec27.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-000767830f4809ed.js",
          revision: "f09lyRq9SGl6Sif-3d2F7",
        },
        {
          url: "/_next/static/css/03fa39a5ea0cdf35.css",
          revision: "03fa39a5ea0cdf35",
        },
        {
          url: "/_next/static/css/08cdfa343ba673d7.css",
          revision: "08cdfa343ba673d7",
        },
        {
          url: "/_next/static/css/0f7fe684dc79c959.css",
          revision: "0f7fe684dc79c959",
        },
        {
          url: "/_next/static/css/1594c4eeaa61fab0.css",
          revision: "1594c4eeaa61fab0",
        },
        {
          url: "/_next/static/css/187a84445fcdf309.css",
          revision: "187a84445fcdf309",
        },
        {
          url: "/_next/static/css/230e2e7aff386f4f.css",
          revision: "230e2e7aff386f4f",
        },
        {
          url: "/_next/static/css/258e4497fa925b60.css",
          revision: "258e4497fa925b60",
        },
        {
          url: "/_next/static/css/2647ddcf11ed89ab.css",
          revision: "2647ddcf11ed89ab",
        },
        {
          url: "/_next/static/css/2e9a453a4ad7a1b5.css",
          revision: "2e9a453a4ad7a1b5",
        },
        {
          url: "/_next/static/css/2f455af8a59d5b17.css",
          revision: "2f455af8a59d5b17",
        },
        {
          url: "/_next/static/css/3cf8fff481a314e2.css",
          revision: "3cf8fff481a314e2",
        },
        {
          url: "/_next/static/css/428e6c0a81fcb49e.css",
          revision: "428e6c0a81fcb49e",
        },
        {
          url: "/_next/static/css/4b1f459400ecd72a.css",
          revision: "4b1f459400ecd72a",
        },
        {
          url: "/_next/static/css/5354ad6b1ea88b29.css",
          revision: "5354ad6b1ea88b29",
        },
        {
          url: "/_next/static/css/55184db618bb4022.css",
          revision: "55184db618bb4022",
        },
        {
          url: "/_next/static/css/5a663dc044973ca3.css",
          revision: "5a663dc044973ca3",
        },
        {
          url: "/_next/static/css/6581260a35f52cc8.css",
          revision: "6581260a35f52cc8",
        },
        {
          url: "/_next/static/css/6f12799a6ec25adb.css",
          revision: "6f12799a6ec25adb",
        },
        {
          url: "/_next/static/css/76b1e9114ab6e618.css",
          revision: "76b1e9114ab6e618",
        },
        {
          url: "/_next/static/css/81599a1256abbc75.css",
          revision: "81599a1256abbc75",
        },
        {
          url: "/_next/static/css/8642c503b567f0be.css",
          revision: "8642c503b567f0be",
        },
        {
          url: "/_next/static/css/8a2ba34228240295.css",
          revision: "8a2ba34228240295",
        },
        {
          url: "/_next/static/css/8ad2bdf46a6dc259.css",
          revision: "8ad2bdf46a6dc259",
        },
        {
          url: "/_next/static/css/8d503021324e0215.css",
          revision: "8d503021324e0215",
        },
        {
          url: "/_next/static/css/8d5de6be88d51252.css",
          revision: "8d5de6be88d51252",
        },
        {
          url: "/_next/static/css/9664ab9d62927e83.css",
          revision: "9664ab9d62927e83",
        },
        {
          url: "/_next/static/css/9b94427e7a9381e7.css",
          revision: "9b94427e7a9381e7",
        },
        {
          url: "/_next/static/css/a226ceacbb69f80a.css",
          revision: "a226ceacbb69f80a",
        },
        {
          url: "/_next/static/css/a9f9ea29905908c6.css",
          revision: "a9f9ea29905908c6",
        },
        {
          url: "/_next/static/css/ab699959edbc876f.css",
          revision: "ab699959edbc876f",
        },
        {
          url: "/_next/static/css/ada292f89c59ed68.css",
          revision: "ada292f89c59ed68",
        },
        {
          url: "/_next/static/css/b01cba94f82efb43.css",
          revision: "b01cba94f82efb43",
        },
        {
          url: "/_next/static/css/b17102a370e34c9f.css",
          revision: "b17102a370e34c9f",
        },
        {
          url: "/_next/static/css/b2ee5bf436a6ab04.css",
          revision: "b2ee5bf436a6ab04",
        },
        {
          url: "/_next/static/css/b9280ea4ace7b818.css",
          revision: "b9280ea4ace7b818",
        },
        {
          url: "/_next/static/css/ba09abc08e0614e4.css",
          revision: "ba09abc08e0614e4",
        },
        {
          url: "/_next/static/css/bb1a4428da677c0a.css",
          revision: "bb1a4428da677c0a",
        },
        {
          url: "/_next/static/css/c9b11fa9a6e55d44.css",
          revision: "c9b11fa9a6e55d44",
        },
        {
          url: "/_next/static/css/cdfbb7aa1e6019ec.css",
          revision: "cdfbb7aa1e6019ec",
        },
        {
          url: "/_next/static/css/ce68cbe024fb6658.css",
          revision: "ce68cbe024fb6658",
        },
        {
          url: "/_next/static/css/cecca0b994f0fdaf.css",
          revision: "cecca0b994f0fdaf",
        },
        {
          url: "/_next/static/css/d6d1809d49c3aedd.css",
          revision: "d6d1809d49c3aedd",
        },
        {
          url: "/_next/static/css/de6bfafc23460195.css",
          revision: "de6bfafc23460195",
        },
        {
          url: "/_next/static/css/e334372ab9d568c1.css",
          revision: "e334372ab9d568c1",
        },
        {
          url: "/_next/static/css/e51ae96e73eac6f0.css",
          revision: "e51ae96e73eac6f0",
        },
        {
          url: "/_next/static/css/eb27e909b1a0d2b6.css",
          revision: "eb27e909b1a0d2b6",
        },
        {
          url: "/_next/static/css/f11c2f1f9a3cf42d.css",
          revision: "f11c2f1f9a3cf42d",
        },
        {
          url: "/_next/static/css/f925a43253ef3b93.css",
          revision: "f925a43253ef3b93",
        },
        {
          url: "/_next/static/css/f94371c8a2eb67ab.css",
          revision: "f94371c8a2eb67ab",
        },
        {
          url: "/_next/static/css/fdadac4168257706.css",
          revision: "fdadac4168257706",
        },
        {
          url: "/_next/static/css/fe4fcb858ab93b18.css",
          revision: "fe4fcb858ab93b18",
        },
        {
          url: "/_next/static/f09lyRq9SGl6Sif-3d2F7/_buildManifest.js",
          revision: "ca9479387b5ba1d91b9ce6ade9c7ee2d",
        },
        {
          url: "/_next/static/f09lyRq9SGl6Sif-3d2F7/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/media/layers-2x.9859cd12.png",
          revision: "9859cd12",
        },
        {
          url: "/_next/static/media/layers.ef6db872.png",
          revision: "ef6db872",
        },
        {
          url: "/_next/static/media/marker-icon.d577052a.png",
          revision: "d577052a",
        },
        {
          url: "/assets/fonts/DM_Sans/DMSans-Bold.ttf",
          revision: "ebd71730120a81fb32716a5741267c0a",
        },
        {
          url: "/assets/fonts/DM_Sans/DMSans-BoldItalic.ttf",
          revision: "e8f8b2d7ada87a131b58609837cba11a",
        },
        {
          url: "/assets/fonts/DM_Sans/DMSans-Italic.ttf",
          revision: "aeb2800bb5a9689537ca38a9c1c19625",
        },
        {
          url: "/assets/fonts/DM_Sans/DMSans-Medium.ttf",
          revision: "e7c71a71fabede4915c352ff5f2a00ce",
        },
        {
          url: "/assets/fonts/DM_Sans/DMSans-MediumItalic.ttf",
          revision: "33deda04b3fe9dc9db171e39682ec8e0",
        },
        {
          url: "/assets/fonts/DM_Sans/DMSans-Regular.ttf",
          revision: "f7267252c3060be5b78df9723cfff85a",
        },
        {
          url: "/assets/fonts/DM_Sans/OFL.txt",
          revision: "c30f8805f50b17431a186dbd53288324",
        },
        {
          url: "/assets/images/Ad.png",
          revision: "20263873eb860673c6dc57a265919d28",
        },
        {
          url: "/assets/images/Ad2.png",
          revision: "18bd76e5d00d381c0cf7400d6dcf230a",
        },
        {
          url: "/assets/images/PASSPORT.png",
          revision: "829ea138dc8c32377dd5066b8c77991b",
        },
        {
          url: "/assets/images/about/about_1.png",
          revision: "db688581e57ca89b4fd22212223c6082",
        },
        {
          url: "/assets/images/about/about_2.png",
          revision: "846403a82b74119cd17aca0b2eae9164",
        },
        {
          url: "/assets/images/about/about_header.png",
          revision: "7ac54b5f6653fe3ac984b84491f84e2d",
        },
        {
          url: "/assets/images/admin/featured_image.png",
          revision: "14562903ae32960760ffcb2426b1e856",
        },
        {
          url: "/assets/images/blog/blog_bg.png",
          revision: "8c2881790c1505615fbd4bda4af47e36",
        },
        {
          url: "/assets/images/blog/blog_header.png",
          revision: "1b4e39655e63a2efdb1c0748256c70f2",
        },
        {
          url: "/assets/images/contact/contact_header.png",
          revision: "c3cf8d5038b76df223440f8da1d9b788",
        },
        {
          url: "/assets/images/contact/contact_header1.png",
          revision: "cc084c74b42513f798e6782105cec773",
        },
        {
          url: "/assets/images/contact/contact_header_mobile.png",
          revision: "2f9820aaae46b92ab07ba3b96ad4400a",
        },
        {
          url: "/assets/images/contact/contact_man.png",
          revision: "b0c8ee093c6712d449d4bb61ea023b66",
        },
        {
          url: "/assets/images/contact/contact_map.jpeg",
          revision: "8acd9c62dc53a275b551344ff1f0a46a",
        },
        {
          url: "/assets/images/contact/contact_map.png",
          revision: "5fb1f979a6b412e157a1d5cc729975a1",
        },
        {
          url: "/assets/images/contact/contact_map_mobile.png",
          revision: "1a0637c387958a1caeea5f8cd54a6ffc",
        },
        {
          url: "/assets/images/dashboard/Illustration.png",
          revision: "d3b99a38d31df829b6e66de47e572386",
        },
        {
          url: "/assets/images/dashboard/accomodation.png",
          revision: "0329d5be070306d9f1bf9e13654bcb65",
        },
        {
          url: "/assets/images/dashboard/dashboard.png",
          revision: "a0be511fefcb2085de95a8656af81f39",
        },
        {
          url: "/assets/images/dashboard/flight.png",
          revision: "a225ebb8f5b27734c3cc4d37c1e8f5cf",
        },
        {
          url: "/assets/images/dashboard/trip.png",
          revision: "7ff06a16bfa7594cb777720aac1856fc",
        },
        {
          url: "/assets/images/event/events.png",
          revision: "94835288183cd48cbdaebc2ce7f22501",
        },
        {
          url: "/assets/images/forgot_password.png",
          revision: "d209a7a866fe5ab2b45749e72581e696",
        },
        {
          url: "/assets/images/gallery/gallery1.png",
          revision: "c23d309192c359db6b488c8848874b47",
        },
        {
          url: "/assets/images/gallery/gallery10.png",
          revision: "fd2e69801a576e40ca0071b7894de025",
        },
        {
          url: "/assets/images/gallery/gallery11.png",
          revision: "9a247bbd860c07730d7f3b46fd0a4df3",
        },
        {
          url: "/assets/images/gallery/gallery12.png",
          revision: "e262ed01beb6bd29558a159600144642",
        },
        {
          url: "/assets/images/gallery/gallery2.png",
          revision: "277adcdd62d468e14fb64c6402d09b10",
        },
        {
          url: "/assets/images/gallery/gallery3.png",
          revision: "7b8855640ceab0edd85aa92aa72a3bd0",
        },
        {
          url: "/assets/images/gallery/gallery4.png",
          revision: "ff2fa093d16a9e9213c1a3a386196661",
        },
        {
          url: "/assets/images/gallery/gallery5.png",
          revision: "1aee8f545905d0f81d89cb71c6e35a1c",
        },
        {
          url: "/assets/images/gallery/gallery6.png",
          revision: "c96ce90ced41344a55bb695a3d087a99",
        },
        {
          url: "/assets/images/gallery/gallery7.png",
          revision: "576f649952f0dd73885efcfcc27e7ee8",
        },
        {
          url: "/assets/images/gallery/gallery8.png",
          revision: "e451ea7f2326011b2f38321e690124a1",
        },
        {
          url: "/assets/images/gallery/gallery9.png",
          revision: "26c4fd829b6a2f61f9d9e1993cc64830",
        },
        {
          url: "/assets/images/gallery/text.png",
          revision: "8036a8a1760d323a208fde1096944556",
        },
        {
          url: "/assets/images/icons/airplane.png",
          revision: "a5e8dd4d134f9838fb3420f9939c34b1",
        },
        {
          url: "/assets/images/icons/calendar.png",
          revision: "690635130ee675e4f120bdfa7d8fd810",
        },
        {
          url: "/assets/images/icons/calendar1.png",
          revision: "e2712c917cc643b046bb79da567323d6",
        },
        {
          url: "/assets/images/icons/dashboard1.png",
          revision: "b0d8f3f24dcb7061377ef196de1ab88a",
        },
        {
          url: "/assets/images/icons/dashboard2.png",
          revision: "b72f11d91e189a097e0259eeff45e37e",
        },
        {
          url: "/assets/images/icons/dashboard3.png",
          revision: "e37df620528dab05a08b1773b69c54c6",
        },
        {
          url: "/assets/images/icons/dollar.png",
          revision: "ebb6ee11526d20eb11d684ff1ea93106",
        },
        {
          url: "/assets/images/icons/facebook.png",
          revision: "ca7a0655aba1bb0ee2fb5dc06a631c3f",
        },
        {
          url: "/assets/images/icons/google.png",
          revision: "9b95fbc88809d9cd337c861a191c0710",
        },
        {
          url: "/assets/images/icons/location.png",
          revision: "47b67d5f4a305e154cf0cd01fa761f8d",
        },
        {
          url: "/assets/images/icons/location2.png",
          revision: "e2f7f4fe7fc96e824e77996f287c5219",
        },
        {
          url: "/assets/images/icons/luggage.png",
          revision: "d415a4a70730aedbc33df7261de23c88",
        },
        {
          url: "/assets/images/icons/luggage1.png",
          revision: "5f60f2652909ec6ca5cd82c56570aee2",
        },
        {
          url: "/assets/images/icons/map.png",
          revision: "3af7f6a709041a24fdc203bd556564ca",
        },
        {
          url: "/assets/images/icons/passport.png",
          revision: "bcbf7fa843d1410130baeed8a579d2c3",
        },
        {
          url: "/assets/images/icons/paystack.png",
          revision: "a6d3d7257606947593e178071e84565b",
        },
        {
          url: "/assets/images/icons/plane.png",
          revision: "5b79561f2f823eaec0f63eaa09275447",
        },
        {
          url: "/assets/images/icons/profile_avatar.jpeg",
          revision: "a706a62eee08a727bfcbc3206f5a4bf4",
        },
        {
          url: "/assets/images/icons/profile_avatar.png",
          revision: "9667657da1609c096369028ca1b3af84",
        },
        {
          url: "/assets/images/icons/saving.png",
          revision: "94e42d141a7b5b640dfd8e5d69d01fe6",
        },
        {
          url: "/assets/images/icons/search.png",
          revision: "6d8e8849f4e9c301a36862cf2a80a2a1",
        },
        {
          url: "/assets/images/landing-page/Landing_page_Header.png",
          revision: "cc062902e898c3c50133ac9fa015b464",
        },
        {
          url: "/assets/images/landing-page/Logo.png",
          revision: "b9aa562b60e40d0101589dcbf7d0fdd7",
        },
        {
          url: "/assets/images/landing-page/bali_river.png",
          revision: "4b98fc836bc58638bce86da406655b63",
        },
        {
          url: "/assets/images/landing-page/bali_waterfall.png",
          revision: "fe98d1b3e711e2ef5103fa42ad10fb54",
        },
        {
          url: "/assets/images/landing-page/calendar.png",
          revision: "d2f74deb0ec20c5a78f8959f1e3a23ea",
        },
        {
          url: "/assets/images/landing-page/dollar.png",
          revision: "8ffd097e6e7848f424cead0718a41f55",
        },
        {
          url: "/assets/images/landing-page/hangout1.png",
          revision: "1aed8644a6aa91ac696c6f574e4c2a7e",
        },
        {
          url: "/assets/images/landing-page/hangout2.png",
          revision: "fd775ae1c7f4313005186a6de6d33d30",
        },
        {
          url: "/assets/images/landing-page/hangout3.png",
          revision: "7d1fd08ae956c3b8cc7b68b7e9e9b09a",
        },
        {
          url: "/assets/images/landing-page/hangout4.png",
          revision: "b5348bb494bc46cf7bebb296da61a81b",
        },
        {
          url: "/assets/images/landing-page/landscape.png",
          revision: "a6de21732abd68583d69c85942e044ff",
        },
        {
          url: "/assets/images/landing-page/logo2.png",
          revision: "50ca2ce9566f469918383632f6984a20",
        },
        {
          url: "/assets/images/landing-page/logo_black.png",
          revision: "ae61c9c13648fe42912feed0b4137c2d",
        },
        {
          url: "/assets/images/landing-page/logo_white.png",
          revision: "50ca2ce9566f469918383632f6984a20",
        },
        {
          url: "/assets/images/landing-page/map.png",
          revision: "d721a8224c3153328be1acf53cfc1413",
        },
        {
          url: "/assets/images/landing-page/santorini.png",
          revision: "3cf3602316a0dfad197609b22769b6a5",
        },
        {
          url: "/assets/images/landing-page/testimonial1.jpeg",
          revision: "50db0ca2055d405a31c76ae3b3c12a0f",
        },
        {
          url: "/assets/images/landing-page/testimonial2.jpeg",
          revision: "f6fe08f5bc4fba16b4b6d2b2e7255ed7",
        },
        {
          url: "/assets/images/landing-page/testimonial3.jpeg",
          revision: "5d82c7862dea0ee6a80c8e5ab1a0c284",
        },
        {
          url: "/assets/images/landing-page/testimonial4.jpeg",
          revision: "87537ffa6568a62d76327f5dd7396059",
        },
        {
          url: "/assets/images/landing-page/vector.png",
          revision: "668c4c50111b8d208be7fa4f8fc3fc06",
        },
        {
          url: "/assets/images/login.png",
          revision: "5c2e4d38d4e03a9b7a66ee00bf6c67a2",
        },
        {
          url: "/assets/images/trip/Rectangle 226.png",
          revision: "98717182b56400510df4945c53cf9d39",
        },
        {
          url: "/assets/images/trip/card1.png",
          revision: "dd02e77bce34fb5282901efe837f274e",
        },
        {
          url: "/assets/images/trip/card10.png",
          revision: "6a9bd103d5b0a6202b7165830773d287",
        },
        {
          url: "/assets/images/trip/card2.png",
          revision: "8691968d7667b4fcd8859effab2e6559",
        },
        {
          url: "/assets/images/trip/card3.png",
          revision: "d0ef3753ee5c56b106a365f3ff0306e9",
        },
        {
          url: "/assets/images/trip/card4.png",
          revision: "21946fe1d8f6d63658021d6301cb468b",
        },
        {
          url: "/assets/images/trip/card5.png",
          revision: "b2f463dbacd0998898f3ae8151cdc2e7",
        },
        {
          url: "/assets/images/trip/card6.png",
          revision: "508e8d8186fe90eba528501e8bb87e1a",
        },
        {
          url: "/assets/images/trip/card7.png",
          revision: "72846314a6d7e3ba91d32e39e870e42f",
        },
        {
          url: "/assets/images/trip/card8.png",
          revision: "134cb17c410ec19ed1496061201b83b1",
        },
        {
          url: "/assets/images/trip/card9.png",
          revision: "e14b61012a21c19fc2bca86b8c027fb0",
        },
        {
          url: "/assets/images/trip/trip_header.png",
          revision: "3a5083a47a4ea51f50c918deec1c5326",
        },
        {
          url: "/assets/images/trip/trip_header_mobile.png",
          revision: "98717182b56400510df4945c53cf9d39",
        },
        {
          url: "/assets/images/user/briefcase.png",
          revision: "d2818cb76aad6eb4e886782f6244cf21",
        },
        {
          url: "/assets/images/user/map-pin.png",
          revision: "3bd49ce8a03a8aa345bdc7ced95e003f",
        },
        {
          url: "/assets/images/user/master_card.png",
          revision: "03b6c730261ed38f5ab3826e308b114a",
        },
        {
          url: "/assets/images/user/schedule.png",
          revision: "376ece52f868212c52cc735f7e2245e3",
        },
        {
          url: "/assets/images/user/user.png",
          revision: "92a7a352add6df27f79046d700be33dd",
        },
        {
          url: "/assets/images/verify.png",
          revision: "05333e3eeec0b3fdfeeee44478596865",
        },
        {
          url: "/assets/images/verify_password2.png",
          revision: "5123d1ad8182ffd1ecae6f3a53579b90",
        },
        {
          url: "/icon-192x192.png",
          revision: "6a3d7b06face782019f53e73a18c4df8",
        },
        {
          url: "/icon-256x256.png",
          revision: "9bd27fab9f9a645155a3c2a657e8c96d",
        },
        {
          url: "/icon-384x384.png",
          revision: "cd5951989f4fae1d096e91e5e4d5f883",
        },
        {
          url: "/icon-512x512.png",
          revision: "4ddc13c6d7eaa9de3bde6e507be9b5c3",
        },
        { url: "/manifest.json", revision: "d02e6e4226a1165b0e7e496252d1ddb4" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      "/",
      new s.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: s,
              response: e,
              event: a,
              state: i,
            }) =>
              e && e.type === "opaqueredirect"
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new s.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new s.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new s.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:mp4)$/i,
      new s.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new s.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        const e = s.pathname;
        return !e.startsWith("/api/auth/") && !!e.startsWith("/api/");
      },
      new s.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        return !s.pathname.startsWith("/api/");
      },
      new s.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      ({ url: s }) => !(self.origin === s.origin),
      new s.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
