import { createClient } from 'contentful-management'
import { ClientAPI } from 'contentful-management/dist/typings/create-contentful-api'
import {
  Collection,
  Environment,
  EnvironmentAlias,
  EnvironmentProps,
  Space,
} from 'contentful-management/dist/typings/export-types'

import { ContentfulOptions } from '../../plugin'

export class ManageEnvironment {
  readonly manage: ClientAPI
  readonly space: Promise<Space>
  readonly environments: Promise<Collection<Environment, EnvironmentProps>>
  constructor(readonly options: ContentfulOptions) {
    this.manage = this.createClient()
    this.space = this.getSpace()
    this.environments = this.getEnvironments()
  }

  private createClient() {
    return createClient({
      accessToken: this.options.accessToken,
      timeout: this.options.timeoutMs,
    })
  }

  public async getSpace(): Promise<Space> {
    return await this.manage.getSpace(this.options.spaceId)
  }

  private async getEnvironments(): Promise<
    Collection<Environment, EnvironmentProps>
  > {
    return await (await this.space).getEnvironments()
  }

  public async deleteEnvironment(environmentId: string): Promise<void> {
    const environment = await (await this.space).getEnvironment(environmentId)
    return environment.delete()
  }

  public async createEnvironmentWithId(
    environmentId: string
  ): Promise<Environment> {
    return (await this.space).createEnvironmentWithId(environmentId, {
      name: environmentId,
    })
  }

  public async changeEnvironmentAliasTarget(
    alias: string,
    environmentId: string
  ): Promise<EnvironmentAlias> {
    const environmentAlias = await (await this.space).getEnvironmentAlias(alias)
    environmentAlias.environment.sys.id = environmentId
    return environmentAlias.update()
  }

  public async getAliasedEnvironmentId(
    alias: string
  ): Promise<string | undefined> {
    const environmentAlias = await (await this.space).getEnvironmentAlias(alias)
    return environmentAlias.environment.sys.id
  }
}
