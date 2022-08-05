import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { screen } from "@testing-library/react";
import renderWithRouterAndProvider from "../renderWithRouterAndProvider";

describe("1 - Renderiza o cabeçalho da tabela", () => {

  it ("O header está presente e com a quantidade correta de itens", async () => {
    renderWithRouterAndProvider(<App />);
    const header = await screen.findAllByRole("columnheader");
    expect(header).toHaveLength(5);
  });

});

describe("2 - Testa a inserção de um novo carro", () => {
  it("O formulário está vazio", () => {
    renderWithRouterAndProvider(<App />);
    expect(screen.getByLabelText(/código/i).value).toBe("");
    expect(screen.getByLabelText(/modelo/i).value).toBe("");
    expect(screen.getByLabelText(/motorista/i).value).toBe(undefined);
  });

  it("o formulário está preenchido", () => {
    renderWithRouterAndProvider(<App />);
    userEvent.type(screen.getByLabelText(/código/i), "989898754381");
    userEvent.type(screen.getByLabelText(/modelo/i), "McLaren");
    expect(screen.getByLabelText(/código/i).value).toBe("989898754381");
    expect(screen.getByLabelText(/modelo/i).value).toBe("McLaren");
  });
});
