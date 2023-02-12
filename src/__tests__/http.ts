import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "utils/http";

/**
 * 以下两个例子都是传统的单元测试,测试一个函数
 */

const apiUrl = process.env.REACT_APP_API_URL;
const server = setupServer();

// jest 是对react最友好的一个测试库
// 执行所有测试之前,先来执行一下回调函数
beforeAll(() => server.listen());

// 每个测试跑完,都重置mock路由
afterEach(() => server.resetHandlers());

// 所有测试跑完,关闭mock路由
afterAll(() => server.close());

// rest 是msw提供的方法,msw作用就是mock,前端构建请求.利用msw做单元测试,请求测试
test("http方法发送异步请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    // 往构造的路由发请求,拦截到就返回虚拟的返回值
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  // 发请求 测试http函数
  const result = await http(endpoint);
  // expect函数来自jest库,jest是前端用于自动化测试的库
  // toEqual比较是否一致
  expect(result).toEqual(mockResult);
});

test("http请求时会在header里带上token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };
  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
