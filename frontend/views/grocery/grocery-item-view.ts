import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/number-field';
import '@vaadin/grid/vaadin-grid';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from 'Frontend/views/view';
import {Binder, field} from '@hilla/form';
import {getGrocery, save} from 'Frontend/generated/GroceryEndpoint';
import GroceryItem from 'Frontend/generated/com/example/application/data/GroceryItem';
import GroceryItemModel from 'Frontend/generated/com/example/application/data/GroceryItemModel';
import '@vaadin/icon';
import {BeforeEnterObserver, Router, RouterLocation} from '@vaadin/router';
import '@vaadin/icons';

@customElement('grocery-item-view')
export class GroceryItemView extends View implements BeforeEnterObserver {

    @state()
    itemId: any;

    @state()
    private grocery?: GroceryItem;
    private binder = new Binder(this, GroceryItemModel);

    async onBeforeEnter(location: RouterLocation) {
        this.itemId = location.params.itemId as string;
        this.grocery = await getGrocery(this.itemId);
        this.binder.read(this.grocery);
    };

    render() {
        return html`
            <div class="p-m">
                <div>
                    <vaadin-text-field
                            ${field(this.binder.model.name)}
                            label="Название">${this.grocery?.name}</vaadin-text-field>
                    <vaadin-number-field
                            ${field(this.binder.model.quantity)}
                            has-controls
                            label="Количество"></vaadin-number-field>
                    <vaadin-button
                            theme="primary"
                            @click=${this.addItem}>
                        Изменить
                    </vaadin-button>
                </div>
            </div>
        `;
    }

    async addItem() {
        const groceryItem = await this.binder.submitTo(save);
        if (groceryItem) {
            Router.go("/grocery")
        }
    }

    async firstUpdated() {
        this.grocery = await getGrocery(this.itemId);
    }
}
