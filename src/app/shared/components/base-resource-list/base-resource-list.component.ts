import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(
        private baseResourceService: BaseResourceService<T>
    ) { }

    ngOnInit() {
        this.baseResourceService.getAll().subscribe(
            resources => this.resources = resources.sort((a, b) => b.id - a.id),
            error => alert('Error ao carregar a lista')
        );
    }

    deleteEntry(resource: T) {
        const mustDelete = confirm('Deseja realmente excluir este item ?');

        if (mustDelete) {
            this.baseResourceService.delete(resource.id).subscribe(
                () => this.resources = this.resources.filter(element => element != resource),
                () => alert("Erro ao tentar excluir!")
            );
        }
    }
}
