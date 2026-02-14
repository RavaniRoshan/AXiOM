from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))

        try:
            print("Navigating to http://localhost:3001")
            page.goto("http://localhost:3001")

            # Wait for any h1 to appear to confirm React mounted
            page.wait_for_selector("h1", timeout=5000)

            # Check for specific text content in h1
            h1_text = page.inner_text("h1")
            print(f"Found H1 text: {h1_text}")

            if "Move fast when" in h1_text and "you break things" in h1_text:
                print("Verification SUCCESS: Found heading text.")
            else:
                print("Verification FAILED: Heading text mismatch.")

            page.screenshot(path="verification_landing.png", full_page=True)

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_landing.png", full_page=True)
            print("Error screenshot saved.")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
