import { getStrategy } from "@pwndao/v1-core";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { useStrategy } from "./use-strategy";

vi.mock("@pwndao/v1-core", () => ({
	getStrategy: vi.fn(),
}));

describe("useStrategy", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should work with ref", () => {
		const wrapper = mount(
			{
				template: "<div></div>",
				setup() {
					const strategyId = ref("test");
					return useStrategy(strategyId);
				},
			},
			{
				global: {
					plugins: [VueQueryPlugin],
				},
			},
		);

		expect(useStrategy).toBeInstanceOf(Function);
		expect(wrapper.vm).toBeDefined();
		expect(getStrategy).toHaveBeenCalledWith("test");
	});

	it("should work with string and function", () => {
		// Test with direct string
		const wrapperWithString = mount(
			{
				template: "<div></div>",
				setup() {
					return useStrategy("test-string");
				},
			},
			{
				global: {
					plugins: [VueQueryPlugin],
				},
			},
		);

		expect(wrapperWithString.vm).toBeDefined();
		expect(getStrategy).toHaveBeenCalledWith("test-string");

		// Reset mock to check function call separately
		vi.clearAllMocks();

		// Test with function
		const wrapperWithFunction = mount(
			{
				template: "<div></div>",
				setup() {
					return useStrategy(() => "test-function");
				},
			},
			{
				global: {
					plugins: [VueQueryPlugin],
				},
			},
		);

		expect(wrapperWithFunction.vm).toBeDefined();
		expect(getStrategy).toHaveBeenCalledWith("test-function");
	});
});
