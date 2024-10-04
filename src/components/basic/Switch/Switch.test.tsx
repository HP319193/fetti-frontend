import React from "react";
import { render } from "@testing-library/react";

import Switch from "./Switch";

describe("Switch", () => {
    test("renders the Switch component", () => {
        render(<Switch title="Hello world!" />);
    });
});
