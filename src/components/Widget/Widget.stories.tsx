import { Meta, Story } from "@storybook/react/types-6-0";
import { Select, SelectOption } from "components/Select";
import { Switch } from "components/Switch";
import { WidgetProps } from "./WidgetTypes";
import { Header } from "./Header";
import { HeaderAction } from "./HeaderAction";
import { Widget } from "./Widget";
import { Content } from "./Content";
import { useEffect, useState } from "react";
import { Form } from "components/Form";
import { TextInput } from "components/TextInput";
import { Icon } from "components/Icon";
import { IconButton } from "components/IconButton";

export default {
  title: "Components/Widget",
  component: Widget,
} as Meta<WidgetProps>;

export const BasicWidget = () => {
  return (
    <Widget>
      <Header>
        <Icon icon="chat" aria-label="chat" />
        <p>Header of widget window</p>
      </Header>
      <HeaderAction></HeaderAction>
      <Content textOnly>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </Content>
    </Widget>
  );
};

export const UsageExample = () => {
  return (
    <div
      style={{
        display: "grid",
        gridColumn: 1,
        gridRowGap: 5,
      }}
    >
      <Widget>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <HeaderAction>
          <IconButton
            icon="settings"
            variant="tertiary"
            aria-label="Settings"
          ></IconButton>
        </HeaderAction>
      </Widget>
      <Widget>
        <Header>
          <p>Header of widget window</p>
        </Header>
        <HeaderAction>
          <Form inline style={{ alignItems: "flex-end", gap: 10 }}>
            <div style={{ width: 200, height: "100%" }}>
              <Select isMultipleSelect aria-label="Options">
                <SelectOption>Option 1</SelectOption>
                <SelectOption disabled>Option 2</SelectOption>
                <SelectOption>Option 3</SelectOption>
                <SelectOption>Option 4</SelectOption>
              </Select>
            </div>
            <div style={{ width: 280, height: "100%" }}>
              <TextInput
                id="input-icon-left"
                aria-label="Search"
                startAddon={<Icon icon="search" aria-label="input icon" />}
                placeholder="Search"
              />
            </div>
          </Form>
        </HeaderAction>
      </Widget>
      <Widget>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <HeaderAction>
          <Form inline>
            <Switch defaultChecked aria-label="test" />
          </Form>
        </HeaderAction>
      </Widget>
    </div>
  );
};

export const EmptyWidget = () => {
  return (
    <Widget empty>
      <Header>
        <Icon icon="settings" aria-label="settings" />
        <p>Header of widget window</p>
      </Header>
    </Widget>
  );
};
export const DisabledWidget = () => {
  return (
    <Widget disabled>
      <Header>
        <Icon icon="settings" aria-label="settings" />
        <p>Header of widget window</p>
      </Header>
      <HeaderAction />
      <Content textOnly>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </Content>
    </Widget>
  );
};

const InteractiveWidgetTemplate: Story<WidgetProps> = ({
  loading,
  empty,
  disabled,
}) => {
  return (
    <div>
      <p>
        In this example, you can controll Widget by setting loading, empty, and
        disabled properties
      </p>
      <Widget loading={loading} empty={empty} disabled={disabled}>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <HeaderAction>
          <IconButton
            icon="more"
            variant="tertiary"
            aria-label="more"
          ></IconButton>
        </HeaderAction>
        <Content textOnly>
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </Content>
      </Widget>
    </div>
  );
};

export const InteractiveWidget = InteractiveWidgetTemplate.bind({});
InteractiveWidget.args = {
  empty: false,
  loading: false,
  disabled: false,
};
export const LoadingEmptyWidget = () => {
  const [loading, setloading] = useState(true);
  const [empty, setempty] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
      setempty(true);
    }, 5000);
  }, []);

  return (
    <div>
      <p>
        In this example, the Widget will display empty content after 5 seconds.
      </p>

      <Widget loading={loading} empty={empty}>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <HeaderAction></HeaderAction>
        <Content textOnly>
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </Content>
      </Widget>
    </div>
  );
};

export const ScrollableWidget = () => {
  return (
    <Widget>
      <Header>
        <Icon icon="chat" aria-label="chat" />
        <p>Header of widget window</p>
      </Header>
      <HeaderAction></HeaderAction>
      <Content>
        <div style={{ width: 2000, marginBottom: 40 }}>
          <h3>Item 1</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            harum atque, aut esse, quisquam vero rem asperiores reprehenderit
            quam saepe expedita beatae aspernatur molestiae, aliquid ab?
            Nesciunt repudiandae qui quos sapiente aperiam iure, totam est eius
            doloremque perferendis unde eaque officiis, error, veniam molestiae
            reprehenderit sed laborum nihil temporibus vitae amet pariatur
            labore. Beatae quos omnis perspiciatis deserunt quibusdam,
            consequatur accusamus cum magnam maiores sit nobis accusantium
            voluptatem aspernatur soluta placeat tempore nisi nesciunt odio
            minima qui enim error ratione reiciendis? Incidunt voluptate sequi
            labore natus cum. Voluptatem error velit rerum, accusamus quis
            fugiat, beatae itaque aliquam tempora aspernatur odio qui asperiores
            rem minus ipsum voluptatum nihil obcaecati fuga fugit unde sit
            placeat. Eveniet aspernatur voluptas sit numquam beatae minus libero
            culpa soluta. Quaerat, praesentium numquam harum, perspiciatis omnis
            in quibusdam sit, optio nihil expedita quod velit autem incidunt
            asperiores! Sit sed sint distinctio neque impedit facere voluptates
            similique quisquam nam, tempora expedita ipsa odio in eius pariatur
            est sunt corrupti dolore animi eaque. Rem aliquam ex sed reiciendis
            perferendis quia velit explicabo adipisci architecto eum, cum omnis
            animi fuga dolores accusamus et libero beatae molestias recusandae
            ad? Ratione culpa ipsum aspernatur deleniti deserunt officia porro
            et similique facilis blanditiis, eius dolorem tenetur, dicta tempora
            asperiores iusto dignissimos unde accusamus natus repellat neque.
            Itaque voluptate nisi, ex natus possimus consectetur in odio
            quibusdam animi, voluptates impedit cupiditate? Sit eveniet dolorem
            voluptatum reiciendis ea obcaecati veniam deleniti soluta, nam
            placeat accusamus eaque, nihil adipisci nobis numquam maxime harum
            atque blanditiis reprehenderit praesentium repellat rem. Mollitia
            maiores consectetur sed, corrupti fuga expedita nisi delectus
            eligendi architecto assumenda dignissimos qui at fugit eaque earum
            dicta, ullam veniam omnis magni animi necessitatibus neque magnam
            impedit saepe. Eos, dignissimos molestiae. Expedita autem vero ipsam
            excepturi sapiente. Temporibus tempora aperiam harum officia quidem
            mollitia voluptatem, nulla recusandae cupiditate rerum quod magni
            odio, aliquam explicabo totam accusamus facilis aspernatur
            repudiandae asperiores! Veritatis veniam quo assumenda inventore,
            labore dolore minima aspernatur expedita. Tempore error officiis
            reprehenderit, ducimus expedita distinctio magni neque iure
            blanditiis, sequi repellat nobis in asperiores explicabo! Quasi
            repellat sint similique voluptates sequi saepe accusamus asperiores
            molestias quisquam aut quaerat dolores tempore ducimus cum, atque
            exercitationem enim, optio quam? Exercitationem doloremque cumque
            delectus ullam deleniti. Blanditiis, temporibus. Quibusdam,
            voluptatem, culpa mollitia repellat officia nesciunt nobis soluta
            illo id, reprehenderit veniam esse? Optio rerum sapiente recusandae
            cum beatae nulla at fugiat placeat vel ipsa, amet qui. Beatae odio
            architecto est sequi expedita, nisi culpa suscipit praesentium
            excepturi ratione, facere molestias quam? Reiciendis, temporibus
            corrupti. Ut a earum id itaque alias exercitationem quis magni
            explicabo quia doloremque dolores laborum corporis laudantium sint
            deserunt facere voluptas voluptates, dicta iure atque quidem fuga ex
            similique? Ullam, voluptas ab voluptatem eligendi aut veniam harum
            repellat quos laboriosam exercitationem impedit maxime iste error in
            ducimus iusto minima consequuntur sequi quo a praesentium, eveniet
            necessitatibus! Voluptate repudiandae ut optio tempore labore dicta
            voluptatum dignissimos quibusdam perspiciatis voluptas minus
            accusamus vitae natus, odio totam praesentium odit, saepe
            repellendus aliquid reprehenderit commodi sed distinctio excepturi.
            Voluptates, deserunt velit dolorum rerum quibusdam, esse vel
            sapiente excepturi ad necessitatibus nostrum iusto fugiat nemo atque
            unde vitae illo at optio qui est aliquid quas id. Optio sed impedit
            perspiciatis sunt quod ipsa nemo saepe culpa fugiat qui. Praesentium
            voluptatem voluptate velit adipisci quibusdam voluptatum unde
            laudantium aliquam, quos odit quam, incidunt excepturi architecto,
            reiciendis nostrum quis dolores exercitationem est numquam expedita
            minus? Necessitatibus laboriosam dicta veritatis repudiandae
            voluptatibus debitis ad cumque totam, non perferendis vitae vero,
            numquam asperiores error tempore nesciunt esse culpa reprehenderit,
            sunt sit nihil rem quidem! Temporibus dolorem animi exercitationem
            quam. Suscipit hic corrupti assumenda adipisci minima aut voluptas
            numquam natus animi provident aliquam id soluta iusto molestias
            distinctio quis fuga laudantium necessitatibus consectetur,
            molestiae mollitia praesentium perferendis doloremque omnis. Omnis,
            cumque sit? Numquam expedita error maiores! Dolorem non fugit
            mollitia esse quos, sint vitae veritatis! Quidem aut harum numquam
            sit inventore ab veritatis expedita, rem assumenda esse consectetur
            perferendis repellendus vero, cupiditate aspernatur provident amet
            repudiandae sed. Velit aliquam maxime repellendus odio sint nihil
            enim molestiae placeat alias aliquid voluptate, vel quod dolore
            doloremque eius eaque ex in aut atque ipsam tenetur facilis
            consequatur sed. Nihil exercitationem cupiditate doloremque alias
            consequuntur natus, itaque temporibus quas reiciendis quia deserunt,
            neque blanditiis ratione officia eum sint autem magnam modi nulla
            culpa, iusto odio non laudantium dolorum. Libero similique
            laudantium omnis nobis doloremque inventore voluptatibus ipsa ipsam
            cupiditate vitae! Unde nemo itaque saepe aliquam similique eius quae
            iste nostrum corporis perferendis labore pariatur nam eveniet in
            sapiente vero laborum quasi dignissimos obcaecati, impedit nesciunt!
            Id, fugit! Assumenda consequuntur molestiae nemo animi, aut atque
            est quae maiores possimus libero quis obcaecati at labore qui
            dolores veniam! Tenetur aperiam illo cupiditate dolorum magni qui
            facilis reprehenderit voluptate sequi dolorem dicta nam, reiciendis
            dolore nobis laboriosam blanditiis quasi rem provident itaque modi!
            Voluptas et a odit laborum cumque quas aspernatur. Ducimus doloribus
            dolorem magnam expedita reprehenderit vitae cupiditate sapiente! Sed
            ea fugit libero! Explicabo iure molestiae beatae enim natus quam
            quidem placeat facere eum porro repellat minima laborum, libero
            accusamus veritatis quae nostrum corporis architecto cupiditate
            iusto minus ea? Culpa eaque temporibus distinctio cum id minima
            illum fuga excepturi laboriosam in odio odit eligendi consequatur,
            tempore deserunt dolorem? Voluptatem, vitae enim. Laboriosam
            voluptatibus pariatur nemo. Qui aliquam nisi recusandae, temporibus
            tenetur ad nostrum. Dolores consequuntur mollitia minima
            necessitatibus rem iusto adipisci aspernatur sint nobis, ab, iste
            debitis illo eveniet harum, nam tempora. Corporis rerum deserunt
            quia minus. Nam, officia modi porro fugit molestiae ipsum maiores
            excepturi?
          </p>
        </div>
        <div style={{ width: 2000, marginBottom: 40 }}>
          <h3>Item 2</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis iure
            veritatis et aperiam reprehenderit omnis perferendis unde assumenda
            quisquam! Amet commodi aliquam nobis provident tempore suscipit
            minima obcaecati officia nostrum fugiat. Accusamus ut nesciunt alias
            repellendus quasi a eius deleniti molestiae doloremque modi nemo
            accusantium ratione sed quisquam beatae quo, necessitatibus hic
            dolore, nisi et ipsam molestias. Aliquid quae quaerat, incidunt
            ipsum tenetur sunt corrupti tempore, recusandae possimus
            reprehenderit quo ullam atque earum mollitia, maiores nam odio
            cumque dolores consequatur ratione beatae. Aspernatur nemo, ex cum
            accusamus sed deleniti voluptas consectetur enim facere asperiores
            quam voluptatibus beatae quibusdam perferendis similique saepe
            minima eveniet quas. Velit animi impedit temporibus explicabo
            recusandae quidem nam cupiditate fugit, consequatur quibusdam nobis
            voluptas sequi tempora provident numquam magnam est nulla ut magni
            nemo doloribus iusto sint, consequuntur ipsa? Molestias, odio. Fuga
            eos quo dicta in quam, nam est sint dolor dignissimos a alias
            facilis ullam adipisci, illum qui quia delectus quisquam hic vel
            corporis vitae sunt cupiditate veniam distinctio! Reiciendis dolorem
            magni animi laborum obcaecati doloribus molestiae consequatur
            cupiditate eaque et, impedit sed ducimus ad maiores sequi harum
            error perspiciatis reprehenderit, ratione quibusdam tempora.
            Delectus facilis labore nam quas sequi reprehenderit molestiae!
            Eaque, rerum perspiciatis dolorum velit mollitia debitis minima quis
            voluptates sit, non porro accusantium amet odit similique atque
            exercitationem dicta? Sint, ipsum, alias voluptatem dolores aut,
            porro ex ratione accusantium fugiat beatae cumque architecto sunt
            officia quod laboriosam! Sit ipsum autem enim quaerat, velit cumque
            quis minus exercitationem? Et sequi ipsa dolorem aspernatur quam
            obcaecati fugit quis quasi excepturi, natus vel maiores est quia id.
            Voluptatum quae velit corporis molestiae eaque vitae consectetur
            quisquam consequatur maiores non? Nulla provident ex harum.
            Voluptatibus molestiae nesciunt at hic quos non harum! Excepturi
            quia unde saepe soluta assumenda a, neque animi cum sunt. Quaerat
            officiis sit itaque, consequuntur iure veritatis voluptate! Facere
            consequuntur, voluptas ut dolorem ipsa numquam tenetur ea dolorum
            veniam vel? Nisi natus quo perspiciatis consectetur velit facere
            provident corporis ipsam sunt. Molestiae sunt aut necessitatibus
            beatae porro recusandae voluptatibus adipisci consectetur, illum quo
            et ex in esse explicabo consequatur praesentium numquam excepturi
            eius dolorum distinctio mollitia ut iure. Expedita tempora minima
            obcaecati vitae exercitationem quas aut possimus, blanditiis natus
            eum doloribus eligendi sapiente vel quae officiis repellat! Quia
            ipsam impedit non laboriosam eius sunt inventore. Laudantium
            reiciendis exercitationem similique eos possimus esse iusto officiis
            quidem natus voluptas, amet quos quasi sit dicta dolor a debitis,
            reprehenderit suscipit quis facilis quod eius excepturi aliquam.
            Labore saepe dolorem ipsam laudantium obcaecati impedit voluptas
            totam eligendi? Magnam natus quam tempora id repudiandae reiciendis
            doloremque iure omnis pariatur, officiis nobis iste provident ipsa
            adipisci aut quisquam nostrum perferendis nisi saepe aperiam? Nemo
            aspernatur optio quae magnam eius modi ab vitae sapiente, iusto amet
            repellendus quisquam earum repudiandae possimus neque blanditiis id
            at ipsa impedit quam cumque! Reiciendis delectus officiis soluta
            temporibus in, blanditiis ipsam repellat repellendus assumenda fugit
            veniam nihil quisquam sint nesciunt vel consequatur magnam! Tempora
            non dolore, quaerat maxime eaque vitae accusantium atque fugiat
            nulla deserunt sequi corrupti nemo fuga similique laborum dolor
            saepe, voluptatem mollitia, ea ipsam aspernatur earum quas. Sed
            repudiandae laboriosam quis obcaecati iure alias, illo doloremque
            quam porro quae animi nulla laborum modi minus atque? Beatae nam
            veritatis quaerat. Debitis assumenda, unde natus eos illo dolor
            pariatur error vero optio alias corrupti, voluptate aliquid porro
            sint molestiae totam possimus incidunt ratione ex fugit dignissimos.
            Enim quisquam eligendi pariatur magni nobis, vitae voluptatibus et
            fugit officia dolorem, hic excepturi, exercitationem ex odit harum
            sint. Magnam eveniet minus tempore, nemo ad quis dolor incidunt
            quibusdam, sit molestias sed commodi cum deleniti fugiat
            praesentium. Unde nobis labore dignissimos sequi maxime nesciunt
            totam quas dolorum odio vitae tempore magni distinctio aliquid,
            nostrum eligendi, ut ipsam autem fugiat exercitationem laborum
            quidem dolor sapiente. Veritatis dolor quam nostrum in? Animi sed
            sunt incidunt eius asperiores ut alias illum ea non, itaque
            distinctio eveniet repudiandae provident at, perspiciatis rerum,
            perferendis quibusdam blanditiis. Laudantium hic maiores iste!
            Consectetur, quam. Doloremque deleniti repellendus at molestiae,
            eaque omnis voluptatibus earum asperiores esse cupiditate. Ducimus
            at odit, cumque fugiat blanditiis itaque accusamus optio natus quos
            laudantium quibusdam soluta ullam quisquam id voluptas aliquam
            consectetur laborum ratione! Maxime debitis ullam earum pariatur, in
            tenetur ut autem voluptatibus consequuntur rerum commodi possimus
            repellat deserunt cupiditate illum accusamus voluptate sint officia
            ipsum neque consequatur. Ab asperiores, recusandae placeat
            repudiandae nam ipsam voluptates omnis ratione, numquam impedit
            expedita cupiditate vel laudantium enim corporis veniam? Tempor
          </p>
        </div>
        <div>
          <h3>Item 3</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            reiciendis nisi dicta asperiores fugiat magni ad quas, cum mollitia
            repellendus. Dolorem molestiae repudiandae, vel commodi dolore
            aperiam consequatur quae, cum nam id reiciendis. Ea commodi repellat
            numquam. Aliquam, saepe commodi? Alias repellendus error, cumque
            corporis omnis pariatur quas et enim sunt, non eius tenetur. Ducimus
            veritatis vel ut natus illo eveniet minima adipisci omnis itaque.
            Ipsum quod quam beatae perspiciatis modi iusto animi minima, odit
            mollitia eaque eum rerum magni sint iste deserunt. Itaque aspernatur
            nisi, exercitationem a, quo doloribus non sequi eaque repellendus
            porro odio. Tempore mollitia, eveniet veritatis sit iusto tenetur
            est unde velit quisquam nesciunt maxime eius expedita voluptates
            commodi minus quas fugit, assumenda nisi repellendus numquam eaque
            nobis adipisci quibusdam quidem? Explicabo voluptatem fuga quaerat
            voluptatum consequuntur eos aliquid incidunt deleniti alias nisi nam
            labore harum repellendus, sequi, voluptates rem nesciunt.
            Necessitatibus pariatur distinctio qui. Saepe, rerum nihil? Tempore
            molestias ea voluptatem adipisci tenetur accusamus perferendis,
            reprehenderit dolor provident aliquid voluptas numquam, obcaecati
            odit, veniam est facilis doloremque voluptatibus. Consequuntur non
            nostrum, accusamus optio molestias deserunt ut quos exercitationem
            quis adipisci ex laborum, ad odio. Optio repellendus inventore
            libero, velit mollitia quisquam rem, corporis vel hic commodi
            aperiam voluptatem quo deserunt facilis saepe sed explicabo? Illo,
            perspiciatis at cupiditate voluptate perferendis iusto, possimus
            soluta totam architecto fuga vero sint quisquam praesentium ipsum
            mollitia suscipit vitae quis omnis ipsam ipsa. Delectus commodi
            assumenda id natus dolorum eius mollitia amet repellat, magnam
            dolor. Iure, nobis inventore? Ipsum totam vero quasi commodi aliquam
            sequi nemo officiis, consequuntur quis iusto quaerat ea asperiores
            veritatis, dolores numquam facilis aliquid omnis. Dicta, similique
            alias eveniet esse pariatur commodi excepturi molestiae. Veniam
            perferendis quasi culpa assumenda laboriosam ipsam vitae nam
            explicabo fugiat animi tenetur tempore odio, praesentium facere
            mollitia optio commodi at aut totam sed molestiae distinctio ad.
            Fugiat, voluptatem mollitia? Fuga, minus ullam repudiandae illo
            eligendi expedita, voluptatum quidem voluptas itaque, perspiciatis
            ducimus aut possimus vero molestiae magnam! Iste optio impedit
            temporibus modi consequatur ad iusto exercitationem magni ut nostrum
            atque quis voluptate, natus provident asperiores molestiae. Veniam
            dolor, deserunt maiores atque nulla veritatis quia, molestias hic
            distinctio possimus illum eos amet consequatur eum facere in facilis
            voluptates itaque vero nisi ab, ducimus ipsam deleniti? Maxime natus
            beatae quod dolore officia cumque eveniet dolores dolorum eum? Eius
            tempore vel laboriosam voluptate reprehenderit ducimus eum.
            Recusandae harum, odio molestias sed ab delectus aut fugit beatae
            minus! Veniam dolorum nulla quasi repellendus unde sequi, maxime
            incidunt praesentium nihil tempore quae architecto minus
            voluptatibus, quis eaque expedita deserunt inventore enim blanditiis
            harum qui omnis aliquam ea! Ad tenetur suscipit reiciendis
            blanditiis velit. Repellat, dolores laborum! Nihil, ab laboriosam.
            Eligendi provident excepturi labore mollitia dicta placeat quisquam
            earum autem libero ratione saepe asperiores fugit aut minus
            blanditiis, dolorem maxime facere! Soluta sapiente, placeat
            similique neque reprehenderit aperiam voluptate suscipit iusto eaque
            aut hic repellendus reiciendis obcaecati numquam itaque quos impedit
            velit cum nesciunt. Nisi perferendis unde ab eum, earum dolorum
            ipsam, nobis voluptate similique quaerat labore numquam nulla enim
            eos possimus aliquam! Molestias consequatur distinctio autem
            obcaecati possimus id sed saepe. Facilis numquam ipsa corrupti,
            alias modi cupiditate odio porro totam aliquam dicta ratione
            provident quos, illum quae consequatur inventore eius? At, natus
            nisi quis, est similique eligendi eius ut dignissimos porro
            praesentium quasi beatae alias, aspernatur quo. Ab excepturi saepe
            cum ex maxime reiciendis, odio rem id quo aperiam illo porro vel
            repellendus corporis! Impedit totam, numquam blanditiis ut
            architecto vero minus. Soluta recusandae cum dignissimos culpa magni
            quae veritatis enim perferendis, ratione quod harum provident ex
            iste ut ipsam unde dicta error alias inventore tempore molestiae
            facere rem autem? Vitae sequi hic assumenda dolorum eveniet
          </p>
        </div>
      </Content>
    </Widget>
  );
};
