# Terms
## Replying Party
WebアプリケーションがAuthenticationAPIを利用して、ユーザの登録や認証を行うエンティティ


# UseCase
## Registration

On a phone:
電話の場合

User navigates to example.com in a browser and signs in to an existing account using whatever method they have been using (possibly a legacy method such as a password), or creates a new account.
ユーザーは、ブラウザでexample.comに移動し、これまで使用していた方法（おそらくパスワードのような従来の方法）を使用して既存のアカウントにサインインするか、新しいアカウントを作成します。

The phone prompts, "Do you want to register this device with example.com?"
電話機から "このデバイスをexample.comに登録しますか？"というプロンプトが表示されます。

User agrees.
ユーザーは、これに同意するものとします。

The phone prompts the user for a previously configured authorization gesture (PIN, biometric, etc.); the user provides this.
携帯電話は、事前に設定された認証ジェスチャー（PIN、生体認証など）の入力をユーザーに求め、ユーザーはこれを提供します。

Website shows message, "Registration complete."
ウェブサイトには、"登録完了 "のメッセージが表示されます。

### PublicKeyCredentialCreationOptions
```
dictionary PublicKeyCredentialCreationOptions {
    required PublicKeyCredentialRpEntity         rp;
    required PublicKeyCredentialUserEntity       user;

    required BufferSource                             challenge;
    required sequence<PublicKeyCredentialParameters>  pubKeyCredParams;

    unsigned long                                timeout;
    sequence<PublicKeyCredentialDescriptor>      excludeCredentials = [];
    AuthenticatorSelectionCriteria               authenticatorSelection;
    DOMString                                    attestation = "none";
    AuthenticationExtensionsClientInputs         extensions;
};
```

- rp
ReplyingPartyに関するデータ
ReplyingPartyIDは識別するために有効なドメイン文字列
登録されたのと同じエンティティの認証にのみ使用することができる

- user
ReplyingPartyが認証を要求しているユーザに関するデータ

- challenge
新しく生成されたクレデンシャルの認証オブジェクトを生成するために使用されるチャレンジ
暗号プロトコルであるWebAuthnはリプレイ攻撃を回避するためにランダムなチャレンジに依存している。
したがってPublicKeyCredentialCreationOptions.challenge と PublicKeyCredentialRequestOptions.challengeの値は、サーバー側でランダムに生成しなければならない
クライアントのリクエストで渡すchallenge値は一致しなければならない。サーバー側は操作が完了するまでchallenge値を一時的に保存すべきである。
リプレイ攻撃を防ぐためには推測するのが不可能になるような十分な長さが必要である。少なくとも16バイトの長さ以上はあるべき。

- pubKeyCredParams
作成されるクレデンシャルの希望するプロパティに関する情報

- timeout
呼び出し側が呼び出し完了ま待機する時間（ミリ秒）

- excludeCredentials
複数のクレデンシャルの作成を制限したいRelyingPartyによる使用。

- authenticatorSelection
create()操作に用いる適切な認証を選択する

- attestation
認証伝搬の優先順位を表明したいRelyingPartyによる使用。

- extensions
クライアントと認証者による追加処理を要求する追加パラメータを含む。
