import { expect, test } from "@playwright/test";

for (const { slug, visualization, slider } of [
	{
		slug: "the-test",
		visualization: "Dot grid visualization",
		slider: "Base Rate",
	},
	{
		slug: "the-signal",
		visualization: "Waterfall display visualization",
		slider: "Detection Threshold",
	},
]) {
	test(`${slug} canvas keeps drawing after slider changes`, async ({
		page,
	}) => {
		await page.goto(`/chapter/${slug}/`);
		const canvas = page
			.getByRole("img", { name: visualization })
			.locator("canvas");
		await expect(canvas).toBeVisible();
		const pixels = () =>
			canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL());
		await expect
			.poll(() =>
				canvas.evaluate((element: HTMLCanvasElement) => {
					const blank = document.createElement("canvas");
					blank.width = element.width;
					blank.height = element.height;
					return element.width > 0 && element.toDataURL() !== blank.toDataURL();
				}),
			)
			.toBe(true);
		const initial = await pixels();
		const control = page.getByRole("slider", { name: slider, exact: true });
		await control.focus();
		await control.press("End");
		await expect.poll(pixels).not.toBe(initial);
		const updated = await pixels();
		await control.press("Home");
		await expect.poll(pixels).not.toBe(updated);
	});
}
