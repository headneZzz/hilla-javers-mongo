import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/number-field';
import '@vaadin/grid/vaadin-grid';
import {html, render} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from 'Frontend/views/view';
import {Binder} from '@hilla/form';
import {getGroceries} from 'Frontend/generated/GroceryEndpoint';
import GroceryItem from 'Frontend/generated/com/example/application/data/GroceryItem';
import GroceryItemModel from 'Frontend/generated/com/example/application/data/GroceryItemModel';
import {GridItemModel} from "@vaadin/grid";
import '@vaadin/icon';
import '@vaadin/icons';
import {router} from "Frontend/index";

@customElement('grocery-view')
export class GroceryView extends View {

    @state()
    private groceries: GroceryItem[] = [];
    private binder = new Binder(this, GroceryItemModel);

    render() {
        return html`
            <div class="p-m">
                <h3>Продукты</h3>
                <vaadin-grid .items="${this.groceries}" theme="row-stripes" style="max-width: 600px">
                    <vaadin-grid-column header="Название" path="name"></vaadin-grid-column>
                    <vaadin-grid-column header="Количество" path="quantity"></vaadin-grid-column>
                    <vaadin-grid-column .renderer="${this.manageRenderer}"></vaadin-grid-column>
                </vaadin-grid>
            </div>
        `;
    }

    async firstUpdated() {
        this.groceries = await getGroceries();
    }

    private manageRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<GroceryItem>) => {
        render(
            html`
                <a href="${router.urlForPath('/grocery/' + model.item.id)}">
                    <vaadin-icon icon="vaadin:edit"></vaadin-icon>
                </a>
            `,
            root
        );
    };
}
